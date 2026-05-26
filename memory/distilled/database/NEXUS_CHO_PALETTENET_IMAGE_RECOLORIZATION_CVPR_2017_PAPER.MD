> **VERSION**: v1 | **Last Updated**: 26/05/2026



PaletteNet: Image Recolorization with Given Color Palette
## Junho Cho, Sangdoo Yun, Kyoungmu Lee, Jin Young Choi
ASRI, Dept. of Electrical and Computer Eng., Seoul National University
{junhocho, yunsd101, kyoungmu, jychoi}@snu.ac.kr
## Abstract
Image recolorization enhances the visual perception of
an image for design and artistic purposes. In this work, we
present a deep neural network, referred to as PaletteNet,
which recolors an image according to a given target color
palette that is useful to express the color concept of an im-
age. PaletteNet takes two inputs: a source image to be re-
colored and a target palette. PaletteNet is then designed
to change the color concept of a source image so that the
palette of the output image is close to the target palette. To
train PaletteNet, the proposed multi-task loss is composed
of Euclidean loss and adversarial loss. The experimental
results show that the proposed method outperforms the ex-
isting recolorization methods. Human experts with a com-
mercial software take on average 18 minutes to recolor an
image, while PaletteNet automatically recolors plausible re-
sults in less than a second.
## 1. Introduction
Color is an essential element of humans’ visual percep-
tions of their daily lives. Beautiful color harmony in art-
works or movies fulfills our desires for color. Thus, design-
ers and artists must put effort into building basic color con-
cepts into their works. A sophisticated selection of color
gives a sense of stability, unity, and identity to works. In
general, designers express a color concept through a color
palette. The color palette of an image represents the color
concept of an image with six colors ordered as shown in
Figure 1.  The corresponding color palette that contains
distinctive color concept is subjective, and the number of
palettes is uncountable. Typical designers would carefully
select a color concept by the palette prior to the work. Fur-
thermore, recoloring an image with a target color palette
is preferred for images to maintain uniformity and identity
among artworks. Thus, the recolorization problem occupies
a critical position in enhancing the visual understanding of
viewers.
Researchers have been tackling the recolorization prob-
lem with various approaches and purposes. Kuhnet al. [9]
Figure 1.The Images and the Corresponding Palettes.The
palettes express color concept of the images. Collected fromDe-
signseeds.com[1]
Figure 2.Our Conceptual Recoloring Model.From a pair of a
source image and a target palette, the resulted image is recolored
according to the color concept of the target palette.
proposed a practical way to enhance visibility for the color-
blind (dichromat) by exaggerating color contrast. However,
it ignored the color concept and lacked aesthetics. Casacaet
al. [2] proposed a colorization algorithm that requires seg-
mentation masks and user’s hints for the colors of some pix-
els. Even though the colorization based on the color hints
was considered the desired color for each pixel, the algo-
rithms were far from automatic colorization.
To reflect the intended color concept, the color palette-
based methods [5, 3] have been proposed.  Greenfieldet
al. [5] proposed a color association method using palettes.
It extracted the color palettes of the source and target images
and recolored the source image by associating the palettes
in the color space. Changet al. [3] proposed a color trans-
ferring algorithm using the relationship between the palettes
of the source and target images. This approach helped users
to have elaborate control over the intended color concept.
However, it is questionable how well the color transform
function [5, 3] in the palette space could be utilized for
the content-aware recolorization. For example, flowers look
## 62

ResBlock1
ResBlock2
ResBlock3
## Target Palette 가
## "
## Source Image
## Feature Encoder
content feature 瀀
## 㰀
## [가
## "
## , 瀀
## 㰀
## ]
## [瀀
## 䀀
## ,琀
## 㰀
## ]
## 瀀
## 䠀
## 瀀
## 䐀
## 瀀
## 䀀
## [가
## "
## , 瀀
## 䐀
## ,琀
## 䀀
## ]
## [가
## "
## , 瀀
## 䠀
## ,琀
## 䐀
## ]
## Recoloring Decoder
## ...
## 18
## 18
## / 16
## ⠀/  16
## 3××⠀
## 512×
## 
## 16
## ×
## ⠀
## 16
## 512
## Conv
## Color Prediction
## 2××⠀
## 
## 6
## 됀
## 89
## 
## 뀀
## [
## 뀀
## ;
## ,琀
## 䠀
## ]
## Convolution
## Concat
## Deconvolution
Figure 3.The Proposed Framework.PaletteNet has two subnets: Feature encoder network which extracts the content feature from the
source image and recoloring decoder network which decodes the content feature and the target palette into the recolored output.
more complicated than the sky. Accordingly, the recoloring
of flowers necessitates more effort than the recoloring of
the sky. Each of the objects has different color characteris-
tics, and the simple palette matching recolorization neglects
them. Moreover, performing color transformation globally
on images might not be appropriate. For example, we might
want the red tulip and the red bird in an image to be recol-
ored separately to a yellow tulip and a green bird. Thus, it is
natural to deploy a deep neural network that has strength in
understanding the contents (tulips, bird, etc.) of the source
image.
In this paper, we propose a deep learning architecture
for the content-aware image recoloring based on the given
target palette. The proposed deep architecture requires two
inputs, which are a source image and a target palette. As de-
scribed in Figure 2, the output image is a recolored version
of the source image with respect to the target palette. In our
paper, the color palette contains six of the most representa-
tive colors in an artwork. Six is minimal and still represen-
tative enough to express analogous, monochromatic, triad,
complementary, or compound combinations of colors. Al-
though the spatial dimension of the palette is small, we as-
sume the amount of information in the palette is abundant to
express a specific color concept. To obtain a realistic recol-
orized image with the given palette, we propose an encoder-
decoder network and multi-task loss function composed of
Euclidean loss and adversarial loss. To gather image and
palette pairs to train the proposed network, we scraped the
Design-seedswebsite [1] and created a dataset. Since the
different color versions of an image do not usually exist,
we propose the color augmentation method to expand the
dataset for training the deep neural network. The proposed
network is trained in an end-to-end and data-driven way. In
the experiments, we show our model outperforms the exist-
ing recolorization model and produces plausible results in a
second, while a human expert takes 18 minutes on average.
- Structure of PaletteNet
Figure 3 depicts the overall structure of the proposed
PaletteNet.  PaletteNet includes two subnets: feature en-
coder (FE) and recoloring decoder (RD). The inputs of
PaletteNet areI
s
, the source (s) image in LAB andP
t
, the
target (t) palette. Target paletteP
t
of PaletteNet is the LAB
color value of 18-dimensional vector, defined by the six
representative colors. The output of PaletteNet is
## ˆ
## I
ab
t
, the
abchannel image, whoseab(color) is altered from source.
Final output
## ˆ
## I
t
is formed by concatenating output of net-
work
## ˆ
## I
ab
t
and source image luminanceI
## L
s
. Thus,I
t
has
identical spatial size of the source image. In short, Palet-
teNet changes color channel conditioned to fixed luminance
value.
FE in PaletteNet, which is fully convolutional neural net-
work, is responsible to recognize contextual information of
## I
s
and encode objects, texture, color as a content featurec.
FE reduces the spatial size of each feature map in half by
residual blocks [6]. It also outputs each intermediate hierar-
## 63

chical feature mapc
i
as the content feature. With a simple
notation,
## FE(I
s
## ) =c={c
## 1
## ,c
## 2
## ,c
## 3
## ,c
## 4
## }.(1)
In RD of PaletteNet, the target paletteP
t
is combined
with the content featurecto perform recolorization.  At
first, RD takesc
## 1
andP
t
as an initial input. After repeat-
ingP
t
spatially on every pixel ofc
## 1
to match the dimen-
sions, the repeatedP
t
andc
## 1
are concatenated in depth,
which denoted as as[P
t
## ,c
## 1
]. Then deconvolution (Deconv)
layer upsamples[P
t
## ,c
## 1
## ]intod
## 1
. The Deconv operations
are depicted with colored arrows in Figure 3 and the out-
put of the operation with same color. The following De-
conv layers upsample[c
## 2
## ,d
## 1
## ]intod
## 2
## ,[P
t
## ,c
## 3
## ,d
## 2
## ]intod
## 3
## ,
## [P
t
## ,c
## 4
## ,d
## 3
## ]intod
## 4
in the same mechanism. Finally, a con-
volution layer transforms[I
## L
s
## ,d
## 4
]intoabcolor prediction,
## ˆ
## I
ab
t
. The architecture with skip-connections from FE to RD
is similar to U-net [11] which is powerful at segmentation
tasks. Because recolorization depends massively on image
content, RD uses the hierarchical content feature from FE,
which encodes the spatial information of image. Since all
the operations are differentiable, FE and RD can be trained
jointly for encoding the contents and recoloring with the
target palette. For fast convergence and stable learning, the
non-linear function oftanhfollows after the final convolu-
tion layer. Our PaletteNetGcan be denoted simply as:
## G(I
s
## ,P
t
## ) =RD(FE(I
s
## ),P
t
)) =RD(c,P
t
## ) =
## ˆ
## I
ab
t
## .
## (2)
Instance Normalization [13] layer follows all the convo-
lution and deconvolution layers in FE and RD. LeakyReLU
activation function is applied after the normalization layers.
- Training of PaletteNet
For training PaletteNet, there must be pairs of an image-
palette(I
j
## ,P
j
). We defineNpairs of dataset asD
orig
## =
## {(I
j
## ,P
j
)|j= 1, ..., N}. We need a source and a target
image-palette pairs which has different color concept of
## (I
j
## ,P
j
)in order to learn recoloring. Of course, different
color version of an image usually does not exist. There-
fore we generate more image-palette pairs from(I
j
## ,P
j
## )
through the proposed color augmentation method. The de-
tailed color augmentation step is explained in Section 4.1.
We generate training data tuple(I
s
## ,P
t
## , I
t
)from(I
j
## ,P
j
## )
through color augmentation. PaletteNet acceptsI
s
andP
t
as inputs, and learns to recolor output
## ˆ
## I
t
with chromaticity
ofP
t
## .
PaletteNet is trained by optimizing two loss functions:
Euclidean loss (E-loss,L
## E
) and Adversarial loss (Adv-loss,
## L
## Adv
). Training has two phases and is depicted in Figure 4.
The first phase is pretraining FE and RD with E-loss. In
this process, FE learns how to extract the content feature of
## FE
## �
## 
## 뀀
## 가
## 됀
## 
## &
## 됀
## '(
## 瀀
## 
## 됀
## '(
## (
## ꀀ
## , 가
## ꀀ
## )~ఀ
## 0123
## E-loss
real?
fake?
## RD
## DN
real?
fake?
- Pretrain FE + RD
with E-loss
- Train RD with
## E-loss + Adv-loss
## 가
## 됀
concat
## 
## 뀀
## 4
## �
## 
## &
## 됀
## Adv-loss
Figure 4. The training PaletteNet involves two phases: 1. Pretrain
FE and RD with E-loss (Section 3.1), 2. Freeze the parameters of
FE and train RD with additional Adv-loss (Section 3.2). This split
training stables learning recolorization process with Adv-loss. See
how to compose the training data tuple in Section 3.3.
the image and RD learns how to recolorize with the con-
tent feature and the given target palette. E-loss trainsGby
minimizing pixel-wise distance between
## ˆ
## I
t
andI
t
## .
However with E-loss,Gonly learns the color augmented
relation betweenI
s
andI
t
. Color augmentation is an es-
sential means of generating different color versions of an
image, but not the ultimate function to learn. Therefore in
second phase, we introduce additional loss term, Adv-loss
to trainGto generate more realistic images likeI
j
## ∈D
orig
## ,
instead of learning the color augmented relations. Adv-loss
is first proposed from GAN [4], which is a promising frame-
work for generating realistic images. GAN adopts two neu-
ral networks, the discriminator network and the generator
network.  The discriminator network is trained to distin-
guish natural images and generated image by the genera-
tor network. On the other hand, the generator network is
trained to produce images that are indistinguishable from
natural images by the discriminator network. This competi-
tive training against each other trains the generator network
to output realistic images. But if either one of the discrim-
inator network and generator network becomes too power-
ful, the competitive learning breaks and the other one fails
to learn from the powerful opponent. Since our PaletteNet
Ghas lots of parameters, applying GAN framework from
the beginning of train happens to be a trouble. Thus as de-
picted in Figure 4, we pretrain FE and RD enough with E-
loss at first phase and adopt Adv-loss at second phase to
train RD and the discriminator networkD.
3.1. Pretraining of FE and RD with E-loss
With E-loss, update the parameters ofG(FE and RD) so
that the Euclidean Norm between the output of PaletteNet
## G(I
s
## ,P
t
## ) =
## ˆ
## I
ab
t
and desiredabimageI
ab
t
minimizes. E-
## 64

loss will be as followed:
## L
## E
## =
## H
## ∑
## W
## ∑
## (
## ˆ
## I
ab
t
## −I
ab
t
## )
## 2
## ,(3)
whereH, Ware height and width of an image and pixel
(x, y) is abbreviated. We overlay the source image lumi-
nanceI
## L
s
on
## ˆ
## I
ab
t
and denote the final output LAB image as
## ˆ
## I
t
## .
As E-loss forcesGto learn the color augmented relation
betweenI
s
andI
t
, we use it only for pretraining FE and
RD. We pretrainGuntil value ofL
## E
converges on training
set.
3.2. Training of RD with Adv-loss
Our proposed Discriminator NetworkDaccepts an im-
ageIand a palettePand classifies if the pair(I,P)is re-
lated. Therefore, the purpose ofGis to generate the output
## ˆ
## I
t
to have the color concept ofP
t
.Daccepts the pair(I,P)
by replicatingPspatially and concatenating in depth toI,
which is identical operation[I,P]explained in RD archi-
tecture.Dof original GAN [4] views an output ofGas
fake, a sample from target data asreal. OurDperforms
binary classification on a pair(I,P)so thatD
fake
(I,P)is
the probability of the pair classified asfake(unrelated), and
## D
real
(I,P)is the probability of the pair classified asreal
(related). The summation of the two probabilities is equal
to 1.
In our adversarial network architecture,GandDare op-
timized to solve the following min-max problem:
min
## G
max
## D
## E
## (I
## 1
## ,P
## 1
## )∼P
real
[logD
real
## (I
## 1
## ,P
## 1
## )]
## +E
## (I
## 2
## ,P
## 2
## )∼P
fake
[logD
fake
## (I
## 2
## ,P
## 2
## )],
## (4)
where(I
## 1
## ,P
## 1
)is afakepair and(I
## 2
## ,P
## 2
)is arealpair. To
be more specific, ourDviews a pair of network generated
image and target palette(
## ˆ
## I
t
## ,P
t
)asfakeand a randomly
sampled pair(I
o
## ,P
o
## )∈D
orig
, which are genuine dataset
and not color augmented, asreal:
## D
real
## (I
o
## ,P
o
## ) = 1,D
fake
## (
## ˆ
## I
t
## ,P
t
## ) = 1.(5)
But practically, the size ofD
orig
is too small and causes
Dto cheat by memorizing all the pairs(I
o
## ,P
o
## )∈D
orig
## .
As a matter of fact, whenGgenerates recolored
## ˆ
## I
t
com-
paratively well with the color concept ofP
t
,Dbarely ob-
serves the pair(I,P)having entirely different color con-
cept. Therefore,Dfinds it very hard to discriminate be-
tween(I
o
## ,P
o
## )and(
## ˆ
## I
t
## ,P
t
), eventually tries to cheat by
memorizing(I
o
## ,P
o
). We experimentally observedDper-
forming strikingly well and not easily fooled ever after 1
epoch trainingDonD
orig
. Therefore following classifica-
tion term is added to preventDfrom cheating:
## D
fake
## (I
o
## ,P
t
## ) = 1,D
fake
## (
## ˆ
## I
t
## ,P
o
## ) = 1.(6)
The two terms prevent cheating ofDby classifying the un-
related pairs asfake. They are crucial to induce well bal-
anced training ofGandD, no longer causing too powerful
D. The classification loss ofDis calculated as:
## L
## D
=−E[logD
fake
## (
## ˆ
## I
t
## ,P
t
)]−E[logD
fake
## (I
o
## ,P
t
## )]
−E[logD
fake
## (
## ˆ
## I
t
## ,P
o
)]−E[logD
real
## (I
o
## ,P
o
## )].
## (7)
And the Adv-loss to trainG(specifically RD) is calculated
as:
## L
## Adv
=−E[logD
real
## (
## ˆ
## I
t
## ,P
t
## )].(8)
Finally, the total loss function ofGis the weighted sum
of the E-loss and the Adv-loss:
## L
## G
=λL
## E
## +L
## Adv
## ,(9)
whereλis a weighting parameter between the two losses
which has been set to 10 in our work. We optimizeL
## D
and
## L
## G
together at each iteration and stop training via valida-
tion.
## 3.3. Training Data Composition
Here, we explain how we prepare the training data tu-
ple(I
s
## ,P
t
## , I
t
)while training FE and RD with E-loss. Ini-
tially, we have the original image-palette datasetD
orig
## =
## {(I
j
## ,P
j
)|j= 1, ..., N}. We perform color augmentation
on eachjth image-palette(I
j
## ,P
j
)pair intoN
a
number of
different image-palette pairs.  Then, we denote the aug-
mented image set asI
j
## ={I
## (j,n)
## |n= 1, ..., N
a
}and the
corresponding augmented palette set asP
j
## ={P
## (j,n)
## |n=
## 1, ..., N
a
}. WithinI
j
## ,P
j
, we randomly sample two pairs,
the source pair(I
s
## ,P
s
)and the target pair(I
t
## ,P
t
). A train-
ing data tuple is a source imageI
s
, a target paletteP
t
, and a
target imageI
t
. We do not use the source paletteP
s
during
training unlike the previous palette matching methods [3, 5].
The total number of possible training data tuples(I
s
## ,P
t
## , I
t
## )
isN
a
## ×N
a
×N. In addition, the source pair and the target
pair can be identical. In this case, PaletteNet reconstructs
the input image with its palette like Auto-encoder model.
When it comes to training with Adv-loss, we additionally
sample(I
o
## ,P
o
)fromD
orig
. Thus, the training data tuple
to trainGandDtogether is(I
s
## ,P
t
## , I
t
## , I
o
## ,P
o
## ). Training
also includes random horizontal flip of the images in the
probability of 0.5.
## 4. Experiments
4.1. Data Preparation and Color Augmentation
We generate the dataset using 1,611 image-palette pairs
scrapped from theDesign-seeds.com[1] website.  Since
we train PaletteNet to change a source image into a tar-
get image, we need a target ground truth image, which is
## 65

Figure 5.The Proposed Color Augmentation and Naive Hue-
shift method(a) the original image (b) the result of the proposed
color augmentation (c) the result of the naive hue-shift by +180.
Compared to (c), (b) alters the color concept only, retaining the
luminance. (c) distorts the luminance from the original image.
the different-colored version of the source image.  How-
ever, a different-colored version of a specific image gen-
erally does not exist. Therefore, color augmentation is an
essential step to define the input and output of our network.
Color augmentation means altering channel-wise pixel val-
ues of an image in a certain color space, like HSV, RGB,
and LAB. We mainly use hue-shift in the HSV color space.
The naive color augmentation shifts the hue value of an im-
age between 1 and 360 in HSV. The problem is that hue-
shift causes a luminance distortion to the image. Since HSV
does not separate luminance as the characteristics of color,
the naive way causes the luminance distortion. Figure 5
(c) clearly shows that the naive hue-shift distorts luminance
from original image (a). Thus, we reinforce the naive hue-
shift algorithm with the LAB color space, which is known
to best express an image’s luminance:
RGB→LABand cacheL
## RGB→HSV
hue−shift
## −−−−−−−→H
## ∗
## SV→L
## ∗
## A
## ∗
## B
## ∗
Final hue-shifted image:LA
## ∗
## B
## ∗
## .
## (10)
The above procedure describes the proposed hue-shift algo-
rithm. The main idea is fixing the luminance of an orig-
inal image during color augmentation. As shown in Fig-
ure 5 (b), it successfully alters color concept only while
the less luminance distortion occurs than the naive hue-
shift algorithm. Fixing luminance is important because we
aim only to change the color concept. We assume that the
corresponding palette of the hue-shifted image is also hue-
shifted by the same amount from the palette of the original
image. We augmented each image-palette pair(I
j
## ,P
j
## )18
times (step of 20 in 360) with the proposed color augmenta-
tion method. We split 1,611 image-palette pairs into 1,561
as the training set and 50 as the validation set, resulting in
28,098 training pairs and 900 validation pairs. Finally, we
resized the images into288×432to keep a constant input
size for the neural network.
4.2. Training and Architecture Details
We trained networks using NVIDIA GTX TitanX and
GTX 1080 GPUs. Because of the image resolution288×
432is relatively large compared to general image recogni-
tion models, we used a small mini-batch size of 12 at GTX
TitanX and 8 at GTX 1080 not to exceed GPU memory.
We used the Adam optimizer [8] while trainingGandD.
Most of the hyper-parameters are from DCGAN [10]. The
learning rate was set to 0.0002 andβ
## 1
as 0.5.
The values of LAB images range:Lin [0, 100],ain
[-86.185, 98,254], andbin [-107.863, 94.482]. For better
input format, we normalized each channel to be the range
in [-1, 1] by linear transforms. We used a palettes in LAB
and normalized in the same way as above.
The most famous normalization is Batch Normaliza-
tion [7]. Applying Batch Normalization has been seemed
mandatory in recent deep neural network architectures. It
helps training the model faster by normalizing a whole
mini-batch and acting like a regularizer. However, some
of image generation tasks show that alternative normaliza-
tion, Instance Normalization (also called Contrast Normal-
ization) [13], enhances generated images. It was first pro-
posed in TextureNet [12] and reported enhanced styliza-
tion performance, even with a desaturated input images.
Instance Normalization performs normalization at each in-
stance of a mini-batch rather than throughout the mini-batch
as Batch Normalization. In our recolorization task, we want
each instance of mini-batch not interfered by different satu-
rations of the others. We used Instance Normalization as it
enhanced our recolorization significantly.
Empirically, the last layer as the convolution was better
at generalization on the validation set compared to the de-
convolution. Moreover, initializing FE without bias and RD
with bias were the best choice through the validation.
Because we aim to recoloring artwork, we set our input
size toH×Wof PaletteNet very large as432×288. We
have tested various architectures ofDfor stable learning.
Our final architecture ofDis 2-strided4×4fully convolu-
tional network of 4 layers. Thus, the output ofDis binary
heat-map with a spatial size ofH/16×W/16. Instance Nor-
malization and LeakyReLU follow each convolution layer
ofD.
## 4.3. Palette Generalization
To evaluate the generalization performance of the pro-
posed method, we tested on the validation images set with
the randomly sampled target palettes. If the model is well
generalized, the output images are recolored according to
the color concept of the any arbitrary target palettes. Fig-
ure 6 shows the results of the generalization experiment.
Sometimes, the source image is monochromatic, while the
target palette is complementary as the first row in Figure 6.
Alternatively, the source image is variegated, and the target
## 66

## (a)(b)(c)
Figure 6. The results of PaletteNet generalization on the randomly
sampled image-palette pair. (a) source image (c) target palette (b)
resulted output
palette is desaturated as the second row in Figure 6. Dif-
ferent characteristics between a source image and a target
palette do not happen while training, because source and
target image-palette pairs are color augmented and share
similar characteristics of the color distribution.  Accord-
ingly, for the givenI
s
, there are onlyN
a
training data tuples
## (I
s
## ,P
t
## , I
t
).  However, our model can generalize even in
those random cases as shown in Figure 6 (c). In the first row
of the figure, PaletteNet recolors flowers with yellow and
blue, while the source image flowers were monochromatic
orange. In the second row of the figure, PaletteNet accepts
a desaturated palette and recolors the variegated source im-
age in a desaturated fashion. These new generated outputs
(c) in Figure 6 cannot be recolored by color augmentation,
which proves our proposed model learns the generalized re-
colorization process with a given palette.
## (a)(b)(c)(d)
Figure 7. (a) Control on the 2nd color of the target palette and (b)
resulted output. (c) Control on the 5th color of the target palette
and (d) resulted output.
## 4.4. Palette Control
PaletteNet does not accept color hints for specific pixel
locations like [2].  The model must deduce where to re-
color with which color in the target palette. To discover
how the colors of palette affect the recoloring process, we
conducted an experiment which we control one color while
other colors in the palette are fixed on a given image. Fig-
ure 7 shows that the second color of the palette presumably
colors the overall tone of the flowers, while the fifth color of
the palette colors background leaves, while fixing the flower
bud in pink. These results also prove that PaletteNet is not
learning color augmentation relations but interprets the tar-
get palette and reflects on the recolored output.
## 4.5. Comparisons
In this section, we evaluated PaletteNet by comparing
with the previous color transfer function method [3] and
the human expert. As shown in Figure 8, (e) by PaletteNet
shows more realistic results compared to (d) by [3]. There
are several differences between [3] and PaletteNet. First,
[3] takes the source paletteP
s
, which ours does not need.
Second, [3] cannot accept a user-favored target palette ex-
plicitly, but the user must adjust the source palette interac-
## 67

## (a)(b) (c)(d)(e)
Figure 8. Compare with the existing recolorization model. (a) source image (b) source palette (c) target palette (d) Changet al. [3] (e)
Proposed method. Our method do not use the source palette (b). (b) is only used in method (d).
tively through the GUI. Each time an user adjust a color of
the palette, the other colors in the palette are altered in re-
sponse to calculate suitable color transform function. Palet-
teNet directly accepts any arbitrary target palette. Third, [3]
modifies the source image by a transfer function defined by
the association of the source palette and the altered palette.
Thus, the transfer function acts independently of pixel lo-
cations and image context but recolors the source image
globally. On the other hand, PaletteNet associates the target
palette and the image content feature and infers which pixel
to recolor with which color in a data-driven manner.
Because the recolorization setting between [3] and ours
differs, in Figure 8, we first applied [3] on the source im-
age (a) by adjusting the source palette (b) to the palette (c),
and the corresponding recolored outputs by color the color
transfer function are (d). In comparison with our method,
we used the pairs of the source image (a) and the palette
(c) as the target palette, and the corresponding recolored
outputs are (e). Our results (e) look more realistic com-
pared to the results of [3] (d). The color transfer function
method is vulnerable to a large-scaled adjustment of the
source palette. In addiction, defining the source palette and
adjusting it to the target palette require much user efforts
and affect recolorization performance. Our method mini-
mizes user effort by explicitly designating the target palette
and gains realistic results.
## 68

## (a)(b)  (c)(d)(e)(f)
Figure 9. Compare on the extreme target palette on a single image. (a) source image (b) source palette (c) target palette (d) Changet al. [3]
(e) Proposed method (f) Human expert with Adobe Photoshop. (b) is only used in (d).
We tested more extreme target palettes on a single im-
age. In this case, professional designers also struggle to ad-
just an image for an extreme target palette. Recolorization
is a common task for designers to post-process color tone
of their work. To compare our model against a designer in
terms of time and quality, we asked a designer, who is an
expert with the commercial software Adobe Photoshop to
recolor a source image with a given target palette. We in-
cluded the Adobe expert’s results and compared them with
[3] and PaletteNet in Figure 9.
The easiest way to recolor an image using Photoshop is
to tweak the RGB color curve until one is satisfied with the
color tone of the image. However, tweaking the RGB curve
recolors an image globally like color transfer function with-
out considering the image’s content. Thus, the human ex-
pert additionally segmented objects like flowers, leaves, and
background as paths, creating layers for each object path
and recoloring them with a brush tool rather than tweaking
the color curve. This local content-aware recoloring pro-
cedure of the human expert costs lots of time but presents
the best recoloring results. PaletteNet performs similar pro-
cedure of human expert: extracting the content feature and
recoloring with target palette conditioned to the content fea-
ture. The human expert’s results are in Figure 9 (f). The
human expert took each 16, 17, and 20 minutes on each
result of 3 rows. Our proposed method in (e) again outper-
forms color transformation function method (d). PaletteNet
produces the plausible results compared to those of human
experts, and each takes less than a second.
## 5. Conclusion
We have proposed PaletteNet that automatically recolors
an image with a given target color palette. Contrary to re-
colorization by the existing method using a color transfer
function, PaletteNet extracts the content features and com-
bines them with the target palette to perform content-aware
recolorization in a data-driven way. As shown in the ex-
periments, it is practically meaningful that PaletteNet out-
performs the existing recolorization method and has an ex-
cellent ability comparable to human experts in generating
recolored images. Furthermore, PaletteNet could make a
realistic and plausible image in less than a second, while a
human expert using Adobe Photoshop takes 18 minutes on
average for the corresponding recoloring work.
## Acknowledgement
This work was supported by Institute for Information
& communications Technology Promotion (IITP) grant
funded by the Korea government (MSIP) (2014-0-00059,
Development of Predictive Visual Intelligence Technology)
and the Brain Korea 21 Plus Project.  We also appreci-
ate Hannah Park for the expert recolorization works with
## Adobe Photoshop.
## 69

## References
[1] Design seeds - for all who love color.http://
design-seeds.com/. Accessed: 2017-04-24.
[2] W. Casaca, M. Colnago, and L. G. Nonato. Interactive im-
age colorization using laplacian coordinates. InInternational
Conference on Computer Analysis of Images and Patterns,
pages 675–686. Springer, 2015.
[3] H. Chang, O. Fried, Y. Liu, S. DiVerdi, and A. Finkel-
stein.  Palette-based photo recoloring.ACM Transactions
on Graphics, 34(4):139:1–139:11, 2015.
[4] I. Goodfellow, J. Pouget-Abadie, and M. Mirza. Generative
Adversarial Networks.arXiv preprint arXiv: . . ., pages 1–9,
## 2014.
[5] G. R. Greenfield and D. H. House. Image recoloring induced
by palette color associations.Journal of WSCG, 11(1):189—
## -196, 2003.
[6] K. He, X. Zhang, S. Ren, and J. Sun. Deep residual learn-
ing for image recognition.arXiv preprint arXiv:1512.03385,
## 2015.
[7] S. Ioffe and C. Szegedy. Batch normalization: Accelerating
deep network training by reducing internal covariate shift.
arXiv preprint arXiv:1502.03167, 2015.
[8] D. Kingma and J. Ba. Adam: A method for stochastic opti-
mization.arXiv preprint arXiv:1412.6980, 2014.
[9] G. R. Kuhn, M. M. Oliveira, and L. A. Fernandes. An ef-
ficient naturalness-preserving image-recoloring method for
dichromats.IEEE transactions on visualization and com-
puter graphics, 14(6):1747–1754, 2008.
[10] A. Radford, L. Metz, and S. Chintala. Unsupervised repre-
sentation learning with deep convolutional generative adver-
sarial networks.arXiv preprint arXiv:1511.06434, 2015.
[11] O. Ronneberger, P. Fischer, and T. Brox. U-net: Convolu-
tional networks for biomedical image segmentation. InIn-
ternational Conference on Medical Image Computing and
Computer-Assisted Intervention, pages 234–241. Springer,
## 2015.
[12] D. Ulyanov, V. Lebedev, A. Vedaldi, and V. Lempitsky. Tex-
ture networks: Feed-forward synthesis of textures and styl-
ized images.arXiv preprint arXiv:1603.03417, 2016.
[13] D. Ulyanov, A. Vedaldi, and V. Lempitsky. Instance normal-
ization: The missing ingredient for fast stylization.arXiv
preprint arXiv:1607.08022, 2016.
## 70

---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, tdd]
