> **METADATA (NEXUS SEMANTIC TAGS)**: [design, color-theory, psychology, ux, academic-research]



Coloring with Words: Guiding Image
## Colorization Through Text-based Palette
## Generation
## Hyojin Bahng
## *1[0000−0002−3571−9870]
## , Seungjoo Yoo
## *1[0000−0002−3078−8527]
## ,
## Wonwoong Cho
## *1[0000−0003−0898−0341]
## , David Keetae
## Park
## 1,3[0000−0001−9725−0193]
## , Ziming Wu
## 2[0000−0003−3348−7727]
## , Xiaojuan
## Ma
## 2[0000−0002−9847−7784]
, and Jaegul Choo
## 1,3[0000−0003−1071−4835]
## 1
## Korea University
## {hjj552,seungjooyoo,tyflehd21,heykeetae,jchoo}@korea.ac.kr
## 2
Hong Kong University of Science and Technology
zwual@connect.ust.hk, mxj@cse.ust.hk
## 3
Clova AI Research, NAVER Corp.
Abstract.This paper proposes a novel approach to generate multiple
color palettes that reflect the semantics of input text and then colorize
a given grayscale image according to the generated color palette. In con-
trast to existing approaches, our model can understand rich text, whether
it is a single word, a phrase, or a sentence, and generate multiple possible
palettes from it. For this task, we introduce our manually curated dataset
called Palette-and-Text (PAT). Our proposed model called Text2Colors
consists of two conditional generative adversarial networks: the text-to-
palette generation networks and the palette-based colorization networks.
The former captures the semantics of the text input and produce rele-
vant color palettes. The latter colorizes a grayscale image using the gen-
erated color palette. Our evaluation results show that peoplepreferred
our  generated  palettes  over  ground  truth  palettes  and  that  our  model
can effectively reflect the given palette when colorizing an image.
Keywords:Color Palette Generation·Image Colorization·Conditional
## Generative Adversarial Networks.
## 1  Introduction
Humans can associate certain words with certain colors. The real questionis, can
machines effectively learn the relationship between color and text?Using text
to express colors can allow ample room for creativity, and it would be useful
to visualize the colors of a certain semantic concept. For instance, since colors
can leave a strong impression on people [19], corporations often decide upon the
season‘s color theme from marketing concepts such as ‘passion.’ Through text
## *
These authors contributed equally.

2Hyojin Bahng and Seungjoo Yoo and Wonwoong Cho
Fig. 1. Colorization results of Text2Colors given text inputs.The text input
is shown above the input grayscale image, and the generated palettes are on the right
of the grayscale image. The color palette is well-reflected in the colorized image when
compared  to  the  ground  truth  image.  Our  model  is  applicable  to  a  wide  variety  of
images ranging from photos to patterns (top right).
input, even people without artistic backgrounds can easily create colorpalettes
that convey high-level concepts. Since our model uses text to visualize aesthetic
concepts, its range of future applications can encompass text to even speech.
Previous methods have a limited range of applications as they only take a
single word as input and can recommend only a single color or a color palette
in pre-existing datasets [12, 8, 15, 25]. Other studies have further attempted to
link a single word with a multi-color palette [21, 36] since multi-color palettes
are highly expressive in conveying semantics [18]. Compared to theseprevious
studies, our model can generate multiple plausible color palettes when given rich
text input, including both single- and multi-word descriptions,greatly increasing
the boundary of creative expression through words.
In this paper, we propose a novel method to generate multiple color palettes
that convey the semantics of rich text and then colorize a given grayscale im-
age according to the generated color palette. Perception of color is inherently
multimodal [4], meaning that a particular text input can be mapped to multiple
possible color palettes. To incorporate such multimodality into our model, our
palette generation networks are designed to generate multiple palettes from a
single text input. We further apply our generated color palette to thecoloriza-
tion task. Motivated from previous user-guided colorizations that utilize color
hints given by users [42, 44], we design our colorization networks to utilize color
palettes during the colorization process. Our evaluation demonstrates that the

Text2Colors3
Fig. 2. How Text2Colors works.Our  model  can  produce  a  diverse  selection  of
palettes  when  given  a  text  input.  Users  can  optionally  choosewhich  palette  to  be
applied to the final colorization output.
colorized outputs do not only reflect the colors in the palette but also convey
the semantics of the text input.
The contribution of this paper includes:
(1) We propose a novel deep neural network architecture that can generate mul-
tiple color palettes based on natural-language text input.
(2) Our model is able to use the generated palette to produce plausible coloriza-
tions of a grayscale image.
(3) We introduce our manually curated dataset called Palette-and-Text(PAT),
which includes 10,183 pairs of a multi-word text and a multi-color palette.
## 4
## 2  Related Work
Color SemanticsMeanings associated with a color are both innate and learned [9].
For instance, red can make us instinctively feel alert [9]. Since color has a strong
association with high-level semantic concepts [10], producing palettes from text
input is useful in aiding artists and designers [18] and allows automaticcoloriza-
tion from palettes [42, 5]. A downside to using text to choose a filter is that filter
names do not usually convey the filter’s colors [21], thus making it difficult for
users to find the filter that matches their taste just by looking at filter names. To
bridge this discrepancy between color palettes and their names, palette recom-
mendation based on user text input has long been studied. Query-based meth-
ods [21, 36] use text inputs to query an image from an image dictionary where
colors are extracted from the queried image to make an associated palette.This
method is problematic in that the text input is mapped to the image content
of the queried image rather than the color that the text implies. Instead of
looking for a target directly, learning-based approaches [14, 27, 23] match color
palettes to their linguistic descriptions by learning their semantic association
from large-scale data. However, our model is the only generative model that
supports phrase-level input.
## 4
Dataset   and   codes   are   publicly   available   at   https://github.com/awesome-
davian/Text2Colors/

4Hyojin Bahng and Seungjoo Yoo and Wonwoong Cho
Conditional GANsConditional generative adversarial networks (cGAN) are
GAN models that use conditional information for the discriminator and the
generator [24]. cGANs have drawn promising results for image generation from
text [32, 31, 43] and image-to-image translation [16, 13, 7]. StackGAN [43] is the
first model to use conditional loss for text to image synthesis. Our model is
the first to utilize the conditioning augmentation technique from StackGAN to
output diverse palettes even when given the same input text.
Interactive ColorizationColorization is a multimodal task and desired col-
orization results for the same object may vary from person to person [4]. A
number of studies introduce interactive methods that allow users to control the
final colorization output [44, 20]. In these models, users directly interact with the
model by pinpointing where to color. Even though these methods achieve satis-
factory results, a limitation is that users need to have a certain level of artistic
skill. Thus instead of making the user directly color an image, other studies take
a more indirect approach by utilizing color palettes to recolor an image [3,5].
Palette-based filters of our model are an effective way for non-expertsto recolor
an image [3].
Sequence-to-Sequence with AttentionRecurrent Neural Networks (RNNs)
are a popular tool due to their superior ability to learn from sequential data.
RNNs are used in various tasks including sentence classification [39], text gener-
ation [37], and sequence-to-sequence prediction [38]. Incorporating attention into
a sequence-to-sequence model is known to improve the model performance [22]
as networks learn to selectively focus on parts of a source sentence.This allows
a model to learn relations between different modalities as is done byour model
(e.g., text - colors, text - action [1], and English - French [40]).
3  Palette-and-Text (PAT) Dataset
This section introduces our manually curated dataset named Palette-and-Text
(PAT). PAT contains 10,183 text and five-color palette pairs, where the set of
five colors in a palette is associated with its corresponding text description as
shown in Figs. 3(b)-(d). Words vary with respect to their relationships with
colors; some words are direct color words (e.g., pink, blue, etc.) while others
evoke a particular set of colors (e.g., autumn or vibrant). To the best of our
knowledge, there has been no dataset that matches a multi-word text and its
corresponding 5-color palette. This dataset allows us to train our models for
predicting semantically consistent color palettes with textual inputs.
Other Color DatasetsMunroe‘s color survey [26] is a widely used large-
scale color corpus. Based on crowd-sourced user judgment, it matches atext to
a single color. Another dataset, Kobayashi‘s Color Image Scale [18], is a well-
established multi-color dataset. Kobayashi only uses 180 adjectives toexpress

Text2Colors5
Fig. 3. Our Palette-and-Text (PAT) dataset.On the left are diverse text-palette
pairs  included  in  PAT.  PAT  has  a  very  wide  range  of  expression,  especially  when
compared to existing datasets. Our dataset is designed to address rich text and multi-
modality, where the same word can be mapped to a wide range of possible colors.
1170 three-color palettes, which greatly limits its range of expression.In con-
trast, our dataset is made up of 4,312 unique words. This includes much more
text that was not traditionally used to express colors. Our task requires a more
sophisticated dataset like PAT, that matches a text to multiple colors and is
large enough for a deep learning model to learn from.
Data CollectionWe generated our PAT dataset by refining user-named palette
data crawled from a community website called color-hex.com. Thousands of users
upload custom-made color palettes on color-hex, and thus our dataset was able
to incorporate a wide pool of opinions. We crawled 47,665 palette-text pairs and
removed non-alphanumerical and non-English words. Among them, we found
that users sometimes assign palette names in an arbitrary manner, missing their
semantic consistency with their corresponding color palettes. Somenames are a
collection of random words (e.g., ‘mehmeh’ and ‘i spilled tea all over my laptop
rip’), or are riddled with typos (e.g., ‘cause iiiiii see right through you boyyyyy’
and ‘greene gardn’). Thus, using unrefined raw palette names would hinder model
performances significantly.
To refine the noisy raw data, four annotators voted whether the text paired
with the color palette properly matches its semantic meanings. We then used
only the text-palette pairs in which at least three annotators out of four agreed
that semantic matching exists between the text and color palette. Including text-
palette pairs in the dataset only when all four annotators agree was found to
be unnecessarily strict, leaving not much room for personal subjectivity. An-
notators perception is inherently subjective, meaning that a text-palette pair
perfectly plausible to one person may not be agreeable to another. We wanted
to incorporate such subjectivity by allowing a diverse selectionof text-palette
pairs. Mis-spelling and punctuation errors were manually correctedafter the
annotators finished sorting out the data.

6Hyojin Bahng and Seungjoo Yoo and Wonwoong Cho
Fig. 4. Overview of our Text2Colors architecture.During training, generatorG
## 0
learns to produce a color palette ˆygiven a set of conditional variables ˆcprocessed from
input textx={x
## 1
,· · ·, x
## T
}. GeneratorG
## 1
learns to predict a colorized output of a
grayscale imageLgiven a palettepextracted from the ground truth image. At test
time, the trained generatorsG
## 0
andG
## 1
are used to produce a color palette from given
text and then colorize a grayscale image reflecting the generatedpalette.
4  Text2Colors: Text-Driven Colorization
Text2Colors consists of two networks: Text-to-Palette Generation Networks (TPN)
and Palette-based Colorization Networks (PCN). We train the first networks
to generate color palettes given a multi-word text and then train the second
networks to predict reasonable colorizations given a grayscale image and the
generated palettes. We utilize conditional GANs (cGAN) for both networks.
4.1  Text-to-Palette Generation Networks (TPN)
Objective FunctionIn this section, we illustrate the Text-to-Palette Genera-
tion Networks shown in Figs. 4 and 5. TPN produces reasonable color palettes
associated with the text input. Letx
i
## ∈R
## 300
be word vectors initialized by
300-dimensional pre-trained vectors from GloVe [29]. Words not included in the
pre-trained set are initialized randomly. Using the CIELabspace for our task,
y∈R
## 15
represents a 15-dimensional color palette consisting of five colors with
Labvalues. After a GRU encoder encodesxinto hidden statesh={h
## 1
,· · ·, h
## T
## },
we add random noise to the encoded representation of text by sampling latent
variables ˆcfrom a Gaussian distributionN(μ(h), Σ(h)). The sequence of condi-
tioning vectors ˆc={ˆc
## 1
## ,· · ·,ˆc
## T
}is given asconditionfor the generator to output
a palette ˆy, while its mean vector  ̄c=
## 1
## T
## ∑
## T
i=1
ˆcis given as the condition for the
discriminator. Our objective function of the first cGAN can be expressed as
## L
## D
## 0
## =E
y∼P
data
[logD
## 0
( ̄c, y)] +E
x∼P
data
[log(1−D
## 0
## ( ̄c,ˆy))],(1)
## L
## G
## 0
## =E
x∼P
data
[log(1−D
## 0
## ( ̄c,ˆy))],
## (2)
where discriminatorD
## 0
tries to maximizeL
## D
## 0
against generatorG
## 0
that tries
to minimizeL
## G
## 0
. The pre-trained word vectorsxand the real color paletteyis
sampled from true data distributionP
data
## .

Text2Colors7
Fig. 5.Model architecture of a generatorG
## 0
that produces thet-th color in the palette
given a sequence of conditioning variables  ˆc={ˆc
## 1
## ,· · ·,ˆc
## T
}processed from an input
textx={x
## 1
,· · ·, x
## T
}. Note that randomness is added to the encoded representation
of text before it is passed to the generator.
Previous approaches have benefited from mixing the GAN objective with
## L
## 2
distance [28] orL
## 1
distance [13]. We have explored previous loss options
and found the Huber (or smoothL
## 1
) loss to be the most effective in increasing
diversity among colors in generated palettes. The Huber loss is given by
## L
## H
(ˆy, y) =
## {
## 1
## 2
## (ˆy−y)
## 2
for|ˆy−y| ≤δ
δ|ˆy−y| −
## 1
## 2
δ
## 2
otherwise.
## (3)
This loss term is added to the generator’s objective function to forcethe gen-
erated palette to be close to the ground truth palette. We also adopted the
Kullback-Leibler (KL) divergence regularization term [43], i.e.,
## D
## KL
(N(μ(h), Σ(h))k N(0, I)),(4)
which is added to the generator’s objective function to further enforce the
smoothness over the conditioning manifold. Our final objective function is
## L
## D
## 0
## =E
y∼P
data
[logD
## 0
( ̄c, y)] +E
x∼P
data
[log(1−D
## 0
## ( ̄c,ˆy))],(5)
## L
## G
## 0
## =E
x∼P
data
[log(1−D
## 0
## ( ̄c,ˆy))] +λ
## H
## L
## H
(ˆy, y)
## +λ
## KL
## D
## KL
(N(μ(h), Σ(h))k N(0, I)),
## (6)
λ
## H
andλ
## KL
are the hyperparameters to balance the three terms in Eq. 6. We
setδ= 1, λ
## H
= 100, λ
## KL
= 0.5 in our model.
## Networks Architecture
Encoding Text through Conditioning Augmentation.Learning a mapping from
text to color is inherently multimodal. For instance, a text ‘autumn’ can be
mapped to a variety of plausible color palettes. As text becomes longer, such

8Hyojin Bahng and Seungjoo Yoo and Wonwoong Cho
as ‘midsummer to autumn’ or ‘autumn breeze and falling leaves’, thescope of
possible matching palettes becomes more broad and diverse. To appropriately
model the multimodality of our problem, we utilize the conditioning augmenta-
tion (CA) [43] technique. Rather than using the fixed sequence of encoded text
as input to our generator, we randomly sample latent vector ˆcfrom a Gaus-
sian distributionN(μ(h), Σ(h)) as shown in Fig. 5. This randomness allows our
model to generate multiple plausible palettes given same text input.
To obtain the conditioning variable ˆc={ˆc
## 1
## ,· · ·,ˆc
## T
}, the pre-trained word
vectorsx={x
## 1
,· · ·, x
## T
}are first fed into a GRU encoder to compute hidden
statesh={h
## 1
,· · ·, h
## T
}. This text representation is fed into a fully-connected
layer to generateμandσ(the values in the diagonal ofΣ) for the Gaussian
distributionN(μ(h), Σ(h)). Conditioning variable ˆcis computed by ˆc=μ+σ⊙ǫ,
where⊙is the element-wise multiplication andǫ∼ N(0, I). The resulting set of
vectors ˆc={ˆc
## 1
## ,· · ·,ˆc
## T
}will be used asconditionfor our generator.
Generator.We design our generatorG
## 0
as a variant of a GRU decoder with
attention mechanism [22, 2, 6]. Thei-th color of the palette ˆy
i
is computed as
## ˆy
i
## =f(s
i
) wheres
i
## =g(ˆy
i−1
, c
i
, s
i−1
## ).(7)
s
i
is a GRU hidden state vector for timei, having the previously generated color
## ˆy
i−1
, the context vectorc
i
, and the previous hidden states
i−1
as input. The
GRU hidden states
i
is given as input to a fully-connected layerfto output
thei-th color of the palette ˆy
i
## ∈R
## 3
. The resulting five colors are combined to
produce a single palette output ˆy.
The context vectorc
i
depends on a sequence of conditioning vectors ˆc=
## {ˆc
## 1
## ,· · ·,ˆc
## T
}and the previous hidden states
i−1
. The context vectorc
i
is com-
puted as the weighted sum of these conditions ˆc
i
’s, i.e.,
c
i
## =
## T
## ∑
j=1
α
ij
## ˆc
j
## .(8)
The weightα
ij
of each conditional variable ˆc
j
is computed by
α
ij
## =
exp(e
ij
## )
## ∑
## T
k=1
exp(e
ik
## )
wheree
ij
## =a(s
i−1
## ,ˆc
j
## ).(9)
a(s
i−1
## ,ˆc
j
## ) =w
## T
σ(W
s
s
i−1
## +W
## ˆc
## ˆc
j
## ),(10)
whereσ(·) is a sigmoid activation function andwis a weight vector. The additive
attention [2]a(s
i−1
## ,ˆc
j
) computes how well thej-th word of the text input
matches thei-th color of the palette output. The scoreα
ij
is computed based on
the GRU hidden states
i−1
and thej-th condition ˆc
j
. The attention mechanism
enables the model to effectively map complex text input to the palette output.
Discriminator.For the discriminatorD
## 0
, the conditioning variable  ̄cand the
color palette are concatenated and fed into a series of fully-connectedlayers. By
jointly learning features across the encoded text and palette, the discriminator
classifies whether the palettes are real or fake.

Text2Colors9
4.2  Palette-based Colorization Networks (PCN)
Objective FunctionThe goal of the second networks is to automatically pro-
duce colorizations of a grayscale image guided by the color palette as a condi-
tioning variable. The inputs are a grayscale imageL∈R
## H×W×1
representing
the lightness in CIELabspace and a color palettep∈R
## 15
consisting of five
colors inLabvalues. The output
## ˆ
## I∈R
## H×W×2
corresponds to the predictedab
color channels of the image. The objective function of the second model can be
expressed as
## L
## D
## 1
## =E
## I∼P
data
[logD
## 1
(p, I)] +E
## ˆ
## I∼P
## G
## 1
[log(1−D
## 1
## (p,
## ˆ
## I))],(11)
## L
## G
## 1
## =E
## ˆ
## I∼P
## G
## 1
[log(1−D
## 1
## (p,
## ˆ
## I))] +λ
## H
## L
## H
## (
## ˆ
## I, I).(12)
## D
## 1
andG
## 1
included in the equation are shown in Fig.4. We have also added the
Huber loss to the generator’s objective function. In other words, the generator
learns to be close to the ground truth image withplausiblecolorizations, while
incorporating palette colors to the output image to fool the discriminator. We
setλ
## H
= 10 in our model.
## Networks Architecture
Generator.The generator consists of two sub-networks: the main colorization
networks and the conditioning networks. Our main colorization networksadopts
the U-Net architecture [33], which has shown promising results in colorization
tasks [13, 44]. The skip connections help recover spatial information [33],as the
input and the output images share the location of prominent edges [13].
The role of the conditioning networks is to apply the palette colors to the
generated image. During training, the networks are given a palettep∈R
## 15
extracted from the ground truth imageI. We utilize the Color Thief
## 5
function
to extract a palette consisting of five dominant colors of the ground truthimage.
Similar to the previous work [44], the conditioning palettepis fed into a series of
1×1conv-relulayers as shown in Fig. 4. The feature maps in layers 1, 2, and 4
are duplicated spatially to match the spatial dimension of theconv9,conv8, and
conv4 features in the main colorization networks and added in an element-wise
manner. The palettepis fed into upsampling layers with skip connections as
well as the middle of the main networks. This allows the generator to detect
prominent edges and apply palette colors to suitable locations of the image.
During test time, we use the generated palette ˆyfrom the first networks (TPN)
as the conditioning variable, colorizing the grayscale image with the predicted
palette colors.
Discriminator.As our discriminatorD
## 1
, we use a variant of the DCGAN archi-
tecture [30]. The image and conditioning variablepare concatenated and fed into
a series ofconv-leaky relulayers to jointly learn features across the image and
the palette. Afterwards, it is fed into a fully-connected layer to classify whether
the image is real or fake.
## 5
http://lokeshdhakar.com/projects/color-thief/

10Hyojin Bahng and Seungjoo Yoo and Wonwoong Cho
Fig. 6. Comparison to baselines and qualitative analysis onmultimodality:
Our TPN generates appealing color palettes that reflect all details of the text input.
Also our model can generate multiple palettes with the same text input(three rows from
bottom). In comparison, Heer and Stone [12]‘s model frequentlygenerates unrelated
colors and has deterministic outputs.
## 4.3  Implementation Details
We first trainD
## 0
andG
## 0
of TPN for 500 epochs using the PAT dataset. We then
trainD
## 1
andG
## 1
of the PCN for 100 epochs, using the extracted palette from
a ground truth image. Finally, we use the trained generatorsG
## 0
andG
## 1
during
test time to colorize a grayscale image with generated palette ˆyfrom a text input
x. All networks are trained using Adam optimizer [17] with a learning rate of
0.0002. Weights were initialized from a Gaussian distribution with zeromean and
standard deviation of 0.05. We set other hyper parameters asδ= 1, λ
## H
## = 100,
andλ
## KL
## = 0.5.
## 5  Experimental Results
This section presents both quantitative and qualitative analyses of ourproposed
model. We evaluate the TPN (Section 4.1) based on our PAT dataset. For the
training of the PCN (Section 4.2), we use two different datasets, CUB-200-2011
(CUB) [41] and ImageNet ILSVRC Object Detection (ImageNet dataset) [34].
5.1  Analysis on Multimodality and Diversity of Generated Palettes
This section discusses the evaluation on multimodality and diversity of our gen-
erated palettes. Multimodality refers to how many different color palettes a single
text input can be mapped to. In other words, if a single text can be expressed
with more color palettes, the more multimodal it is. As shown in Fig. 6, our
model is multimodal, while previous approaches are deterministic, meaning that
it generates only a particular color palette when given a text input. Diversity
within a palette refers to how diverse the colors included in a single palette are.
Following the current standard for perceptual color distance measurement, we
use the CIEDE2000 [35] on CIELabspace to compute a model’s multimodal-
ity and diversity. To measure multimodality, we compute the average minimum

Text2Colors11
Fig. 7. Attention analysis.Attention scores measured by the TPN for two text input
samples. Each box color (in green) denotes the attention scorecomputed in producing
the corresponding color shown on top. The dashed-line boxes indicate the word that
each color output attended to.
distances between colors from different palettes. To measure diversity of a color
palette, we measure the average pairwise distance between the five colors within
a palette. All measurements are computed based on the test dataset.
Results.Table 1 shows the multimodality and diversity measurement among the
variants of our model. The CA module (Section 4.1) enables our networks to sug-
gest multiple color palettes when given the same text input. The model variant
without CA (the first row in Table 1) results in zero multimodality, indicating
that the networks generate identical palettes for the same text input. Another
palette generation model by Heer and Stone [12] also has zero multimodality.
This shows that TPN is the only existing model that can adequately express mul-
timodality, which is crucial in the domain of colors. Although Heer and Stone’s
model has higher diversity than TPN, Fig. 6 shows that their palettescontain
irrelevant colors that may increase diversity but decrease palettequality. On the
other hand, TPN creates those palettes containing colors that well matcheach
other. Results on the fooling rate will be further illustrated in Section 5.3.
5.2  Analysis on Attention Outputs
The attention module (Section 4.1) plays a role of attending to particular words
in text input to predict the most suitable colors for the text input. Fig. 7 illus-
trates how the predicted colors are influenced by attention scores. The green-
colored boxes show attention scores computed for each word token when pre-
dicting each corresponding color in the palette. Higher scores are indicated by
dashed-line boxes. We observe that three colors generated by attending toghoul
are all dark and gloomy, while the other two colors attending tofunare bright.
This attention mechanism enables our model to thoroughly reflect the semantics
included in text inputs of varying lengths.

12Hyojin Bahng and Seungjoo Yoo and Wonwoong Cho
Fig. 8. Qualitative analysis on semantic context.Our model reflects subtle nu-
ance  differences  in  the  semantic  context  of  a  given  text  input  in  the  color  palette
outputs. Except for the first column, all the text combinationsshown here are unseen
data.
Table 1. Quantitative analysis results
Palette EvaluationUser Study: Part I
Model Variations    Diversity   MultimodalityFooling Rate (%)
Objective Function   CAMean  StdMeanStdMean  StdMax Min
Ours (TPN)X19.36  8.740.00.0----
Ours (TPN)O20.82  7.435.438.1156.212.776.737.1
Heer and Stone-35.92 12.660.00.039.6  10.858.2  25.8
Ground truth palette   -32.60 21.84------
## 5.3  User Study
We conduct a user study to reflect universal user opinions on the outputs of our
model. Our user study is composed of two parts. The first part measures how
the generated palettes match the text inputs. The second part is a survey that
compares the performance of our palette-based colorization model to another
state-of-the-art colorization model. 53 participants took part in our study.
Part I: Matching between Text and Generated PalettesOur goal is to
generate a palette with a strong semantic connection with the given text input.
A natural way to evaluate it is to quantify the degree of connection between
the text input and the generated palette, in comparison to the same text input
and its ground truth palette. Given a text input, its generated palette, and the
ground truth palette, we ask human observers to select the palette that best suits
the text input. A fooling rate (FR) in this study indicates the relative number
of generated palettes chosen over ground truth palettes. More people choosing
the generated palette results in a higher FR. This measure has often been used
to assess the quality of colorization results [44, 11]. We will use this metric to
measure how much a text input matches its generated palette.

Text2Colors13
Fig. 9. Colorization performance comparisons. Mean and standard deviation val-
ues for each question are reported for the baseline [44] and our PCN. Our PCN scores
higher on all of the questions, showing that users are more satisfied with PCN.
Study Procedure.Users participate in the user study over TPN and Heer and
Stone’s model [12]. Each consists of 30 evaluations. We randomly choose a single
data item out of 992 test data and show the text input along with the generated
palette and the ground truth palette.
Results.In Table 1, we measure the FR score for each person and compute
the mean and the standard deviation (std) of all of the scores from participants.
Max and min scores represent the highest and the lowest FR scores, respectively,
recorded by a single person. While Heer and Stone’s model [12] shows low FR of
39.6%, our TPN has the FR of 56.2% while maintaining a high level of diversity
and multimodality. The FR of 56.2% indicates that the generated palettesare
indistinguishable to human eyes and sometimes even match the inputtext bet-
ter than the ground truth palettes. Note that the standard deviation of 12.7%
implies diverse responses to the same data pairs.
Part II: Colorization ComparisonsIn this part of the user study, we con-
duct a survey on the performance of the PCN given palette inputs. Users are
asked to answer five questions based on the given grayscale image, the color
palette, and the colored image. For quantitative comparison, we set a state-of-
the-art colorization model [44] as our baseline. This model originally contains
local and global hint networks. In our implementation of the baseline model,
we utilize the global hint networks to infuse our generated palette tothe main
colorization networks. Note that we modified the baseline model to fit ourtask.
Our novelty is the ability to produce high-quality colorization with only five col-
ors of a palette while our baseline [44] needs 313 bins ofabgamut. Our model
is able to colorize with limited information due to novel components such as the
conditional adversarial loss and feeding the palette into skip-connection layers.
Study  Procedure.We show colorization results of our PCN and the baseline
model one-by-one in a random order. Then, we ask each participant to answer

14Hyojin Bahng and Seungjoo Yoo and Wonwoong Cho
Fig. 10.We compare colorization results with previous work [44]. The five-color palette
used for colorization is shown next to the input grayscale image. Note that our PCN
performs better at applying various colors included in the palette.
five different questions (shown in Fig. 9) based on a five-point Likert scale. The
focus of our questions is to evaluate how well the palette was used in colorizing
the given grayscale image. The total number of data samples per test is 15.
Results.The resulting statistics are reported in Fig. 9. Our PCN achieves higher
scores than the baseline model across all the questions. We can infer that the
palettes generated by our model are preferred over palettes createdby a human
hand. Since our model learns consistent patterns from a large number ofhuman-
generated palette-text pairs, our model may have generated color palettes that
more users could relate to.
## 6  Conclusions
We proposed a generative model that can produce multiple palettes from rich
text input and colorize grayscale images using the generated palettes.Evalua-
tion results confirm that our TPN can generate plausible color palettes from
text input and can incorporate the multimodal nature of colors. Qualitative re-
sults on our PCN also show that the diverse colors in a palette are effectively
reflected in the colorization results. Future work includes extending our model
to a broader range of tasks requiring color recommendation and conductingthe
detailed analysis of our dataset.
Acknowledgement.This work was partially supported by the National Re-
search Foundation of Korea (NRF) grant funded by the Korean government
(MSIP) (No. NRF2016R1C1B2015924). Jaegul Choo is the corresponding au-
thor.

Text2Colors15
## References
-  Ahn, H., Ha, T., Choi, Y., Yoo, H., Oh, S.: Text2Action: Generative adversarial
synthesis from language to action. In: Proc. the IEEE International Conference on
Robotics and Automation (ICRA) (2018)
-  Bahdanau, D., Cho, K., Bengio, Y.: Neural machine translation by jointly learning
to align and translate. In: Proc. the International Conference onLearning Repre-
sentations (ICLR) (2014)
-  Chang,  H.,  Fried,  O.,  Liu,  Y.,  DiVerdi,  S.,  Finkelstein,  A.:Palette-based  photo
recoloring. ACM Transactions on Graphics (TOG)34(4) (2015)
-  Charpiat, G., Hofmann, M., Sch ̈olkopf, B.: Automatic imagecolorization via mul-
timodal  predictions.  In:  Proc.  the  European  Conference  on  Computer  Vision
## (ECCV) (2008)
-  Cho, J., Yun, S., Lee, K., Choi, J.Y.: PaletteNet: Image recolorization with given
color  palette.  In:  Proc.  the  IEEE  Conference  on  Computer  Visionand  Pattern
## Recognition Workshops (2017)
-  Cho, K., Van Merri ̈enboer, B., Gulcehre, C., Bahdanau, D., Bougares, F., Schwenk,
H.,  Bengio,  Y.:  Learning  phrase  representations  using  RNN  encoder-decoder  for
statistical machine translation. In: Conference on Empirical Methods in Natural
Language Processing (EMNLP) (2014)
-  Choi,  Y.,  Choi,  M.,  Kim,  M.,  Ha,  J.W.,  Kim,  S.,  Choo,  J.:  StarGAN:  Unified
generative adversarial networks for multi-domain image-to-image translation. In:
Proc. the IEEE Conference on Computer Vision and Pattern Recognition (CVPR)
## (2017)
-  Chuang,  J.,  Stone,  M.,  Hanrahan,  P.:  A  probabilistic  model  of  the  categorical
association  between  colors.  In:  Proc.  the  IS&T  Color  and  Imaging  Conference
(CIC). vol. 2008 (2008)
-  Crozier, W.: The psychology of colour preferences. Coloration Technology26(1)
## (1996)
-  De  Bortoli,  M.,  Maroto,  J.:  Colours  across  cultures:  Translating  colours  in  in-
teractive marketing communications. In: Proc. the European Languages and the
Implementation of Communication and Information Technologies (ELICIT) (2001)
-  Guadarrama, S., Dahl, R., Bieber, D., Norouzi, M., Shlens, J., Murphy, K.: Pix-
color: Pixel recursive colorization. In: Proc. the British Machine Vision Conference
## (BMVC) (2017)
-  Heer,  J.,  Stone,  M.:  Color  naming  models  for  color  selection,  image  editing  and
palette design. In: Proc. the SIGCHI Conference on Human Factorsin Computing
Systems (SIGCHI) (2012)
-  Isola, P., Zhu, J.Y., Zhou, T., Efros, A.A.: Image-to-image translation with con-
ditional adversarial networks. In: Proc. the IEEE Conference on Computer Vision
and Pattern Recognition (CVPR) (2017)
-  Jahanian, A., Keshvari, S.,  Vishwanathan, S.,  Allebach,J.P.: Colors–messengers
of concepts: Visual design mining for learning color semantics. ACM Transactions
on Computer-Human Interaction (TOCHI)24(1) (2017)
-  Kawakami, K., Dyer, C., Routledge, B.R., Smith, N.A.: Character sequence models
for  colorful  words.  In:  Proc.  the  Conference  on  Empirical  Methods  in  Natural
Language Processing (EMNLP) (2016)
-  Kim, T., Cha, M., Kim, H., Lee, J., Kim, J.: Learning to discover cross-domain re-
lations with generative adversarial networks. In: Proc. the International Conference
on Machine Learning (ICML) (2017)

16Hyojin Bahng and Seungjoo Yoo and Wonwoong Cho
-  Kingma, D.P., Ba, J.: Adam: A method for stochastic optimization. In: Proc. the
International Conference on Learning Representations (ICLR) (2014)
-  Kobayashi, S.: Color image scale. http://www.ncd-ri.co.jp/english/main
## 0104.html
## (2009)
-  Labrecque, L.I., Milne, G.R.: Exciting red and competent blue: the importance of
color in marketing. Journal of the Academy of Marketing Science40(5) (2012)
-  Li,  X.,  Zhao,  H.,  Nie,  G.,  Huang,  H.:  Image  recoloring  usinggeodesic  distance
based color harmonization. Computational Visual Media1(2) (2015)
-  Liu, Y., Cohen, M., Uyttendaele, M., Rusinkiewicz, S.: Autostyle: Automatic style
transfer from image collections to users’ images. Computer Graphics Forum (CGF)
## 33(4) (2014)
-  Luong, M.T., Pham, H., Manning, C.D.: Effective approachesto attention-based
neural  machine  translation.  In:  Proc.  the  Conference  on  EmpiricalMethods  in
Natural Language Processing (EMNLP) (2015)
-  McMahan, B., Stone, M.: A bayesian model of grounded colorsemantics. Transac-
tions of the Association of Computational Linguistics (TACL)3(1) (2015)
-  Mirza,  M.,  Osindero,  S.:  Conditional  generative  adversarialnets.  arXiv  preprint
arXiv:1411.1784 (2014)
-  Monroe, W., Hawkins, R.X., Goodman, N.D., Potts, C.: Colorsin context: A prag-
matic neural model for grounded language understanding. Transactions of the As-
sociation of Computational Linguistics (ACL) (2017)
-  Munroe,R.:Colorsurveyresults.Onlineat
http://blog.xkcd.com/2010/05/03/color-surveyresults (2010)
-  Murray, N., Skaff, S., Marchesotti, L., Perronnin, F.: Toward automatic and flexible
concept transfer. Computers & Graphics36(6) (2012)
-  Pathak,  D.,  Krahenbuhl,  P.,  Donahue,  J.,  Darrell,  T.,  Efros,  A.A.:  Context  en-
coders: Feature learning by inpainting. In: Proc. the IEEE Conference on Computer
Vision and Pattern Recognition (CVPR) (2016)
-  Pennington,  J.,  Socher,  R.,  Manning,  C.:  Glove:  Global  vectors  for  word  repre-
sentation.  In:  Proc.  the  Conference  on  Empirical  Methods  in  Natural  Language
Processing (EMNLP) (2014)
-  Radford,  A.,  Metz,  L.,  Chintala,  S.:  Unsupervised  representation  learning  with
deep  convolutional  generative  adversarial  networks.  In:  Proc.  the  International
Conference on Learning Representations (ICLR) (2015)
-  Reed,  S.,  Akata,  Z.,  Lee,  H.,  Schiele,  B.:  Learning  deep  representations  of  fine-
grained  visual  descriptions.  In:  Proc.  the  IEEE  Conference  on  Computer  Vision
and Pattern Recognition (CVPR) (2016)
-  Reed, S., Akata, Z., Yan, X., Logeswaran, L., Schiele, B.,Lee, H.: Generative adver-
sarial text to image synthesis. In: Proc. the International Conference on Machine
Learning (ICML) (2016)
-  Ronneberger, O., Fischer, P., Brox, T.: U-net: Convolutional networks for biomed-
ical image segmentation. In: Proc. the International Conference on Medical Image
Computing and Computer Assisted Intervention (MICCAI) (2015)
-  Russakovsky,  O.,  Deng,  J.,  Su,  H.,  Krause,  J.,  Satheesh,  S.,  Ma,  S.,  Huang,  Z.,
Karpathy, A., Khosla, A., Bernstein, M., et al.: Imagenet largescale visual recog-
nition challenge. International Journal of Computer Vision (IJCV)115(3) (2015)
-  Sharma, G., Wu, W., Dalal, E.N.: The CIEDE2000 color-difference formula: Imple-
mentation notes, supplementary test data, and mathematicalobservations. Color
## Research & Application30(1) (2005)
-  Solli, M., Lenz, R.: Color semantics for image indexing. In: Proc. the Conference
on Colour in Graphics Imaging and Vision (CGIV) (2010)

Text2Colors17
-  Sutskever,  I.,  Martens,  J.,  Hinton,  G.E.:  Generating  text  with  recurrent  neural
networks.  In:  Proc.  the  International  Conference  on  Machine  Learning  (ICML)
## (2011)
-  Sutskever,  I.,  Vinyals,  O.,  Le,  Q.V.:  Sequence  to  sequence  learning  with  neural
networks. In: Advances in Neural Information Processing Systems(NIPS) (2014)
-  Tang, D., Qin, B., Liu, T.: Document modeling with gated recurrent neural network
for  sentiment  classification.  In:  Proc.  the  Conference  on  Empirical  Methods  in
Natural Language Processing (EMNLP) (2015)
-  Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser,
L., Polosukhin, I.: Attention is all you need. In: Advancesin Neural Information
Processing Systems (NIPS) (2017)
-  Wah, C., Branson, S., Welinder, P., Perona, P., Belongie, S.: The Caltech-UCSD
Birds-200-2011  Dataset.  Tech.  Rep.  CNS-TR-2011-001,  California  Institute  of
## Technology (2011)
-  Xiao,  Y.,  Zhou,  P.,  Zheng,  Y.:  Interactive  deep  colorization  with  simultaneous
global and local inputs. arXiv preprint arXiv:1801.09083 (2018)
-  Zhang, H., Xu, T., Li, H., Zhang, S., Huang, X., Wang, X., Metaxas, D.: Stack-
GAN: Text to photo-realistic image synthesis with stacked generative adversarial
networks. In: Proc. the IEEE International Conference on Computer Vision (ICCV)
## (2017)
-  Zhang,  R.,  Zhu,  J.Y.,  Isola,  P.,  Geng,  X.,  Lin,  A.S.,  Yu,  T.,  Efros,  A.A.:  Real-
time user-guided image colorization with learned deep priors. ACM Transactions
on Graphics (TOG) (2017)