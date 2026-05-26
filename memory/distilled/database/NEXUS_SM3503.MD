> **VERSION**: v1 | **Last Updated**: 26/05/2026



## 135
Sensors and Materials, Vol. 36, No. 1 (2024) 135–146
MYU Tokyo
## S & M 3503
## *
Corresponding author: e-mail: trchou@ntnu.edu.tw
https://doi.org/10.18494/SAM4537
## ISSN 0914-4935 © MYU K.K.
https://myukk.org/
Color Palette Generation of Mixed Color Images
## Using Autoencoder
Tzren-Ru Chou
## *
and Jie-Yun Shao
Department of Graphic Arts and Communications,
## National Taiwan Normal University,
No. 162, HePing E. Road, Section 1, Taipei 106, Taiwan, R.O.C.
(Received May 31, 2023; accepted January 9, 2024)
Keywords:	  color	palette,	color	image,	color	filter,	autoencoder
The color sensor, fundamental in designing image filter algorithms for smartphones, is often
developed  on  the  basis  of  the  demands  of  commercial  imaging  applications.  The  creation  of  a
color  palette  is  an  essential  step  for  designers  when  planning  color  schemes.  In  this  study,  we
introduce  a  method  for  generating  blended  color  imagery,  called  the  ‘color  image’  in  some
previous works,
## (8,9)
to construct personalized palettes that cater to individual emotional needs.
We  modified  the  training  approach  of  the  autoencoder,  incorporating  data  related  to  emotions
into the training samples. This allowed us to establish a correspondence between color imagery
and  palettes  on  the  basis  of  Kobayashi’s  color  image  scale.  Through  linear  interpolation
calculations  between  different  types  of  imagery,  we  derived  the  emotional  coordinates  of
blended  color  imagery.  Using  these  derived  coordinates,  we  fed  them  into  the  trained
autoencoder model to reconstruct the generated palette for blended color imagery. We conducted
a  visual  evaluation  experiment,  and  the  results  showed  that  the  emotional  conveyance  of  the
generated blended color imagery palettes is consistent with human perception. Additionally, we
presented two sample applications: emotional filters and background frameworks. We anticipate
that the findings of this study can offer a new perspective for the development and application of
the color sensor.
## 1.       Introduction
The  development  of  the  color  sensor  as  the  foundation  for  the  design  of  smartphone  image
filter algorithms is often guided by the demands of commercial image applications. The use of
color  in  design  has  been  extensively  researched,  and  its  effect  on  designers  during  the  design
process  is  higher  than  that  of  form.
## (1)
Color  is  one  of  the  important  features  in  human  visual
perception, and many psychologists have studied the relationship between color and perception.
## (2)

For example, Kaya and Epps found that color can affect cognitive performance.
## (3)
Hanada used
correspondence analysis to analyze the relationship between color and emotion,
## (4)
whereas Chen
et al. assigned colors on the basis of vocabulary and found many similarities in the responses of

136 Sensors and Materials, Vol. 36, No. 1 (2024)
subjects from the UK and China.
## (5)
Color is crucial in design, whether it is for website design,
product  packaging,  or  advertising  posters,  as  it  helps  convey  the  designer’s  intended  message
and emotions. Generating the color palette is an important step in creating color schemes, and
the  right  palette  can  significantly  affect  people’s  emotional  responses.  Traditionally,  the
correlation  between  color  palettes  and  emotions  is  evaluated  on  the  basis  of  the  designer’s
experience.  The  automatic  color  palette  generation  method  proposed  in  this  study  can  help
designers speed up the process of creating color schemes.
Color palette generation has gradually become an essential design tool in modern design, as
demonstrated by the image-based color palette method developed.
## (6)
This technique can not only
be  widely  used  in  product  design  but  also  applied  to  various  multimedia  platforms,  such  as
websites,  applications,  videos,  and  animations.  With  appropriate  color  palette  generation
technology,  designers  can  more  easily  select  the  best  color  palette.  Personalized  color  palettes
are also gaining attention in multimedia design, as they can create an atmosphere that matches
the emotional intent of the content and improve the user experience, as shown in Fig. 1. In recent
years, personalized color palettes that reflect a person’s emotions and personality have become
increasingly popular, and studies have shown that people with strong personalities tend to prefer
colors that represent their personality traits.
## (7)
To meet this demand, we developed a method of
generating a mixed color image to create personalized color palettes that match emotional needs.
The proposed method involves creating a mixed color image with specific emotions and using an
autoencoder  to  generate  a  color  palette  that  reflects  the  emotional  content  of  the  mixed  color
image. As shown in Fig. 2, different degrees of color filters from sweet to bitter are generated.
The  generated  color  palette  will  be  personalized  and  designed  to  elicit  the  desired  emotional
response. This method has the potential for revolutionary development in various industries.
Color  plays  a  crucial  role  in  design,  and  an  appropriate  color  palette  can  affect  people’s
emotional  responses.  We  propose  a  method  for  generating  a  blended  color  image  with
personalized and effective qualities to create color palettes that meet emotional needs. The study
uses  the  color  image  scale  (CIS)  research  data,
## (8,9)
which  was  created  by  Kobayashi  through
pioneering research on emotional vocabulary and color palettes using the semantic differential
method and factor analysis, and shows the correlation between color and emotion on the CIS.
The  first  step  was  to  reconstruct  Kobayashi’s  CIS  research  into  data  that  includes  several
color palettes for each color image and image location. In this study, we refer to image location
as  color  image  emotional  coordinates  (CIECs),  where  images  and  color  palettes  with  adjacent
CIEC locations are similar. Conversely, the farther the CIEC location, the greater the difference
between  the  image  and  the  color  palette.  Next,  the  data  was  placed  into  an  autoencoder  as
training  samples  to  train  a  spatial  model  similar  to  the  original  data  for  use  in  generating  a
blended  color  image.  Finally,  by  linear  interpolation,  the  blended  CIEC  was  calculated  and
combined with the specified color palette in the trained model to generate a color palette for a
blended color image.

Sensors and Materials, Vol. 36, No. 1 (2024) 137
- Data, Materials, and Methods
2.1 Color palette generation
One common way to generate a color palette is by extracting colors from an image, such as
using image segmentation in the HSI color space to produce a layered color palette.
## (10)
Wa ng  et
al. mapped the relationship between color themes and affective words to Kobayashi’s CIS, and
then  expanded  the  data  using  internet  resources  to  convert  the  emotional  representation  of
images using this database.
## (11)
Another method is to extract the emotional value of a theme from
pixels.
## (12)
Kim and Suk proposed a method of generating emotionally diverse key colors using
techniques  such  as  neural  networks  and  emotion  analysis,  which  can  generate  emotionally
appropriate colors on the basis of user needs.
## (13)
Kita et al. proposed a color-palette-based image
Fig.	1.	   (Color	online)	Application	of	  generated	results	on	   image	filters.
Fig.	2.	   (Color	online)	Results	of	  generating	color	filters	with	varying	degrees	of	  sweetness	to	  bitterness.

138 Sensors and Materials, Vol. 36, No. 1 (2024)
search  method  that  uses  color  weight  and  color  palette  matching  to  search  for  relevant  images
based  on  user-specified  color  palettes,  further  expanding  the  application  range  of  color
palettes.
## (14)
Xu et al. aimed to explore the connection between words and colors, which may vary
across  different  cultural  backgrounds.
## (15)
To  achieve  this,  researchers  used  the  CIS  tool  and
crawled  a  large  number  of  image  data  from  sites  such  as  Flickr  and  Google  Image  Search  to
build a dataset containing different word and color associations. This data set was used to train
the model to evaluate the degree of association between different words and colors.
These studies demonstrate the diversity and importance of generating color palettes. Whether
generating  a  color  palette  from  keywords  or  images,  the  ultimate  goal  is  to  allow  colors  to
convey the emotions that viewers may perceive, further affecting human perception.
2.2 Color image
The combination of colors in images can connect users on an emotional level, making it an
important tool in the field of design. According to Zhang and Yang,
## (16)
color is a psychological
attribute  that  evokes  emotions  in  visual  experiences  and  creates  emotional  resonance  with
people.  Kobayashi’s  CIS  is  a  dataset  that  is  relevant  to  this.  Kobayashi  first  positioned  140
monochromatic  colors  on  a  two-dimensional  CIS,  and  then  used  psychological  experiments  to
position  adjectives  describing  a  color  image  on  a  similar  scale,  known  as  the  adjective  image
scale.
## (8)
On  the  basis  of  monochromatic  colors,  a  series  of  color  combinations  applicable  to
design were then developed, and in 1991,
## (9)
the keyword image scale and the color combination
image  scale  were  used  to  record  more  detailed  data  on  color  combinations.  These  color
combinations  are  represented  by  the  Munsell  notation,
## (8)
and  we  obtained  the  required  sRGB
data by interpolating the renotation data (x yY values) provided by the Munsell Color Lab.
## (17 )
## The
174	representative	color	images	from	the	research	were	positioned	on	   a	 scale	ranging	from	−3	   to
-  The  horizontal  axis  (x-axis)	scale	of	   −3	to	   3	  represents	warm–cool	variations,	whereas	the
vertical axis (y-axis)	scale	of	   −3	   to	   3	  represents	hard–soft	variations.	We	obtained	the	required
raw data for this study by manually measuring the central coordinates of color imagery texts, as
per original data in the aforementioned book (pp. 12 and 13).
## 2.3    Autoencoder
The autoencoder (AE) and generative adversarial networks (GANs) are the commonly used
generative  models  in  deep  learning.  AE  is  typically  used  for  the  dimensionality  reduction  of
input data and for reconstructing high-dimensional data. It consists of an encoder and a decoder,
where  the  encoder  encodes  the  high-dimensional  input  data  into  a  low-dimensional
representation  and  the  decoder  decodes  the  low-dimensional  representation  back  into  high-
dimensional output data. During this process, the model learns the mapping between the input
and the output, reducing the error between the input and the decoded data. Common applications
of AE include image, speech, and text generation. For example, Li et al. proposed a method for
image classification using AE in the YCbCr color space to reduce computational complexity.
## (18)
Hashisho et  al.  used  a  denoising  AE  with  U-Net  architecture  for  the  color  restoration  of

Sensors and Materials, Vol. 36, No. 1 (2024) 139
underwater  images,
## (19)
whereas  Gomes  et  al.  used  AE  for  correcting  images  under  different
lighting conditions.
## (20)
GANs  are  models  composed  of  two  neural  networks:  a  generator  and  a  discriminator.  The
generator  attempts  to  generate  data  that  is  similar  to  real  data,  whereas  the  discriminator
attempts  to  distinguish  between  real  data  and  data  generated  by  the  generator.  These  two
networks  compete  with  each  other  until  the  generated  data  is  indistinguishable  from  the  real
data. GANs are commonly used for image generation, image style transfer, automatic coloring,
and data augmentation, among other related techniques. For instance, Chen et al.
## (21)
proposed the
Cartoon GAN model combined with the VGG network, which converts real photos into cartoon-
style images.
AE models are mostly used for image color reconstruction. We utilize the characteristics of
AE and apply them to color generation. Instead of using traditional input data, sRGB values and
emotional coordinates are used as input, with the goal of reconstructing data that is similar to the
original data. By changing the emotional coordinates in the input data, a related color palette can
be obtained.
## 2.4    Methods
The method for creating a mixed color image palette involves first digitizing Kobayashi’s CIS
data. Next, AE is trained on the CIS data to reconstruct its features. Finally, the mixed CIEC and
specified color palette are fed into the trained model for generation, resulting in a mixed color
image palette. The next section will showcase the generated results. Kobayashi’s CIS is a scale
that  links  image  and  color  together,  with  data  including  CIECs  and  color  palettes.  This
configuration  is  helpful  for  systematically  implementing  color  schemes.  In  this  study,  the
original data of CIECs and color palettes were digitized and AE was used to reconstruct CIS as
shown  in  Fig.  3,  obtaining  data  that  is  similar  to  the  original  data  to  facilitate  subsequent
generation.
We modified the typical training method for AE by incorporating the color palette of CIS and
its  corresponding  CIECs  into  the  training  samples.  The  training  samples  were  sourced  from  a
total  of  174  color  images,  comprising  1132  color  palettes,  allowing  us  to  establish  the  data
relationship between color images and their respective palettes, as illustrated in Fig. 4. During
training,  we  employed  a  seven-layer  MLP  model  (11-256-256-3-256-256-11),  with  the  three
middle  cells  representing  the  latent  variables.  The  input  and  output  layers  each  received  11
values,  including  the  color  frequencies  of  three  sRGB  colors  for  color  imagery  and  its
corresponding x, y  values.  In  this  study,  we  utilized  the  Adam  optimizer,  without  the  use  of
dropout layers, and training concluded after 500000 epochs. Here,
c
represents the color palette
for each color image in the original data and
## (   )
,xy denotes the CIEC for each color image. After
dimensionality  reduction  by  the  encoder  and  dimensionality  restoration  by  the  decoder,  we
obtained the reconstructed color palettes
c'
and
## ()
',   'xy. After completing AE training, during
the  generation  of  mixed  imagery  color  palettes,  it  is  possible  to  specify  any  two-color  images.
The  CIECs  for  different  degrees  of  imagery  variation  can  be  obtained  through  linear
interpolation based on their respective CIECs. The number of interpolation points, N, can be set

140 Sensors and Materials, Vol. 36, No. 1 (2024)
as  needed.  The  CIEC  values  at  these  interpolation  points  can  be  used  to  generate  the  desired
mixed imagery color palettes.
In this study, we incorporated a specified color palette of a color image (e.g., sweet) and the
CIEC  of  another  color  image  (e.g.,  bitter)  outside  the  specified  color  image  into  the  system
architecture of AE. The results obtained through the linear interpolation of the CIEC were fed
into the trained AE model. The formulas are as follows:
Fig. 3. (Color online) Reconstructed CIS.
Fig. 4. (Color online) Autoencoder.

Sensors and Materials, Vol. 36, No. 1 (2024) 141

## (   )
## 12
1xx  xtt=+−
## (1)
and

## (   )
## 12
1, yttyy=+−
## (2)
with t = i / N, where N is the number of desired generated samples.
## ()
## 11
,xy represents the CIEC
of the specified color scheme sweet and
## ()
## 22
,xy represents the CIEC of another specified color
scheme  bitter.  Figure  5  illustrates  the  process  of  generating  a  mixed  emotional  color  scheme
from  the  sweet  color  scheme  and  sweet’s  emotional  coordinates  to  bitter’s  generated  color
scheme.  This  generation  method  allows  for  mixing  two  or  more  color  schemes  with  mixed
emotional color schemes.
Figure 6 shows the results of five generative color palettes by linear interpolation using the
sweet–bitter  and  colorful–simple  and  appealing  CIECs,  along  with  the  corresponding  color
schemes generated by combining them with the sweet and colorful color palettes, respectively.
Fig. 5. (Color online) Generating a color palette of mixed color images.
Fig. 6. (Color online) Generating results of mixed color images.

142 Sensors and Materials, Vol. 36, No. 1 (2024)
-   Results and Discussion
In  this  section,  we  will  explain  the  AE  training  samples,  the  AE  training  process,  and  the
results of the color palette generation method that we proposed. We will also assess the results
generated through visual experiments and provide some potential applications for this method.
Firstly,  the  AE  model,  as  mentioned  earlier,  is  a  traditional  neural  network  architecture
composed  of  multiple  dense  layers.  The  training  data  consisted  of  1132  samples  of  CIS  color
combinations,  originating  from  174  different  color  images.  Note  that  the  number  of  color
combinations  per  color  image  is  not  uniform.  Each  color  image  is  associated  with  a  single
independent x-y coordinate pair, representing the emotional tendencies of cool–warm and soft–
hard. These color values and the CIEC x-y raw data are sourced from the original CIS book (as
referenced). However, as the original data did not provide corresponding sRGB color values, the
values used in this research experiment were obtained through interpolation using the Munsell
notation provided in Kobayashi’s earlier research (as referenced). Additionally, the x-y data was
manually measured.
The  training  of  AE  employed  the  MSE  loss  function  and  utilized  the  Adam  optimizer  for
estimating all weight parameters. The training process was highly stable and rapidly converged.
By epoch=1000, the MSE had already decreased from 0.805848 to 0.014947 and continued to
steadily  decrease.  To  achieve  the  goal  of  generating  colors  with  almost  imperceptible
differences, the training was carried out until epoch = 500000, ultimately reducing the MSE to
0.00000560, nearly approaching zero. Figure 7 illustrates the convergence of AE training, with
Fig.  7(a)  representing  the  stages  from  epoch  =  1  to  epoch  =  1000,  and  Fig.  7(b)  depicting  the
entire process from epoch = 1 to epoch = 500000.
Subsequently,  we  conducted  a  series  of  visual  observation  assessment  experiments.  We
selected  10  pairs  of  color  imagery  categories,  namely,  sweet–bitter,  colorful–simple  and
appealing, old-fashioned–modern, casual–formal, showy–pure and simple, soft–sharp, happy–
solemn, wild–urban, sweet and dreamy–practical, and mature–youthful. For each pair, 25 color
palettes were generated (N = 25), resulting in a total of 10 color palettes. These color palettes
were  distributed  to  60  participants  in  the  form  of  an  online  questionnaire.  Participants  were
asked to provide their observations and perceptions regarding the degree of imagery blending
in the generated color palettes. An example of the questionnaire is shown in Fig. 8. We set the
order  of  color  palettes  generated  by  AE  as  the  standard  answer  and  arbitrarily  selected  three
color  palettes,  asking  participants  to  restate  the  order  they  perceived.  Finally,  we  assessed
whether  the  participants’  answers  matched  the  order  generated  by  AE,  and  the  results  are
presented in Table 1. The findings indicate a positive recognition of the visual conveyance of
the generated color palettes. The imagery presentation of our generated color palettes exhibited
consistency  in  the  emotional  blending  degree  order  with  the  perception  of  the  majority  of
humans in most of the tests.
In terms of application, in this study, we incorporate the generated mixed color image palette
results into design templates to create photo filters or frames, as shown in Fig. 9. Figures 10 and
11 respectively show the results of applying design templates as filter effects to photos and their

Sensors and Materials, Vol. 36, No. 1 (2024) 143
Fig. 7. (Color online) Convergence process of AE training: (a) before 1000 epochs and (b) entire process.
Fig. 8. (Color online) Sample questionnaire image.
(a)( b)
## Table 1
Results of visual observation assessment experiment.
Color image 1Color image 2Response consistency
## 1sweetbitter0.89
2colorfulsimple and appealing0.89
## 3old-fashionedmodern0.75
## 4casualformal0.22
5showypure and simple0.67
## 6softsharp0.60
## 7happysolemn0.91
## 8wildurban0.52
9sweet and dreamypractical0.57
## 10matureyouthful0.49

14 4 Sensors and Materials, Vol. 36, No. 1 (2024)
use as frames. With the prevalence of social media today, users commonly express their moods
through photos. Designing filters or frames allows for more variations in photos and enhances
the conveyance of emotions.
Fig. 9. (Color online) Design templates of various color palette layouts for the colorful to simple generated results.
Fig. 10. (Color online) Results of adding design frames to photos.
Fig.	11.	  (Color	online)	Results	of	  applying	filters	to	  photos.

Sensors and Materials, Vol. 36, No. 1 (2024) 145
## 4.       Conclusion
The image color filter method we designed offers a potential avenue for the development of
color sensor technology. In this study, we utilized AE to generate color palettes of a mixed color
image,  with  the  aim  of  assisting  designers  in  personalizing  their  color  schemes.  We  used  data
from CIS and transformed it into numerical data, which was then fed into AE as training data to
construct  a  data  mapping  relationship  between  a  color  image  and  color  palettes.  Finally,  the
emotion  coordinates  of  the  specified  mixed  color  image  and  color  palettes  were  fed  into  the
trained  AE  model  to  generate  customized  palettes  with  a  different  mixed  color  image.  As  a
result,  the  application  in  conveying  emotions  in  photographs  allows  users  to  express  stronger
feelings through color palettes that contain a different image. The effectiveness of this approach
can be observed from the sample image mentioned above, highlighting the necessity of research
in developing color emotional filters for photos.
## Acknowledgments
This  work  was  supported  by  a  project  from  the  National  Science  and  Technology  Council
## (NSTC 112-2420-H-003-002).
## References
1 A. Damle and P. J. Smith: Design Stud. 30 (2009) 521. ht t ps://doi.org /10.1016/j.dest ud.2009.01.001
2    W.  R.  Crozier:  Rev.  Prog.  Coloration  Relat.  Top.  26  (1996)  63.  ht t p s://d oi.o r g /10.1111/j.1478 - 4 4 0 8.19 96.
t b 0 0111. x
3 N. Kaya and H. H. Epps: College Stud. J. 38 (2004) 396. http://dx.doi.org/
4 M. Hanada: Color Res. Appl. 43 (2018) 224. ht t ps://doi.org /10.1002/col.22171
5 Y. Chen, J. Yang, Q. Pan, M. Vazirian, and S. Westland: Color Res. Appl. 45 (2020) 85. ht t ps://doi.org /10.1002/
col.22434
6  S.  Liu,  M.  Tao,  Y.  Huang,  C.  Wang,  and  C.  Li:  IEEE  Trans.  Visual  Comput.  Graphics  (2022)  1.  htt ps://doi.
org /10.1109/TVCG.2022.3226218
7 J. Jue and J. H. Ha: Front. Psychol. 13 (2022). https://doi.org/10.3389/fpsyg.2022.1065372
8 S. Kobayashi: Color Res. Appl. 6 (1981) 93. ht t ps://doi.org /10.1002/col.5080060210
9 S. Kobayashi: Color Image Scale (Kodansha, New York, 1991).
10 J. Delon, A. Desolneux, J. L. Lisani, and A. B. Petro: IEEE Int. Conf. Image Process. 2005 2 (2005) II. htt p://
d x.doi.org /10.1109/ ICIP.2005.1530153
11 X. Wang, J. Jia, and L. Cai: Visual Comput. 29 (2013) 1121. ht t ps://doi.org /10.1007/s00371- 012- 0755-3
12 S. Liu and H. Luo: Color Res. Appl. 41 (2016) 513. ht t ps://doi.org /10.1002/col.21988
13     E.  Kim  and  H.-J.  Suk:  Proc.  24th  ACM  Int.  Conf.  Multimedia  (2016)  1316.  htt ps://doi.
org/10.1145/2964284.2964323
14      N.  Kita,  S.  Kawasaki  and  T.  Saito:  SIGGRAPH  Asia  2022  Posters  (2023)  Article  9.  htt ps://doi.
org/10.1145/3550082.3564203
15      L.  Xu,  S.  J.  Park,  and  S.  Lee:  ACM  Trans.  Comput.-Hum.  Interact.  30  (2023)  Article  51.  htt ps://doi.
org /10.1145/3571816
16 X. Zhang and M. Yang: Color Res. Appl. 44 (2019) 651. ht t ps://doi.org /10.1002/col.22374
17    Munsell  Renotation  Data:  https://www.rit.edu/science/munsell-color-science-lab-educational-
resources#munsell-renotation-data (accessed April 2022).
18  Z.  Li,  Y.  Fan,  and  F.  Wang:  2015  8th  Int.  Congr.  Image  and  Signal  Processing  (CISP)  (2015)  351.  htt ps://doi.
org /10.1109/CISP.2015.7407903
19 Y. Hashisho, M. Albadawi, T. Krause, and U. F. v. Lukas: 2019 11th Int. Symp. Image and Signal Processing
and Analysis (ISPA) (2019) 117. ht t ps://doi.org /10.1109/ ISPA.2019.8868679

146 Sensors and Materials, Vol. 36, No. 1 (2024)
20 P. R. Gomes, H. H. Sabuj, M. A. Uddin, M. T. Reza, R. I. Faiz, and M. A. Alam: 2021 Int. Conf. Electronics,
Information, and Communication (ICEIC) (2021) 1. https://doi.org/10.1109/ICEIC51217.2021.9369779
21 Y. Chen, Y. K. Lai, and Y. J. Liu: 2018 IEEE/CVF Conf. Computer Vision and Pattern Recognition (2018) 9465.
ht t ps://doi.org /10.1109/CV PR.2018.00986
About the Authors
Tzren-Ru  Chou  received  his  B.S.  degree  in  applied  mathematics  from
National  Chung  Hsing  University,  Taiwan  (1988),  and  his  Ph.D.  degree  in
computer science from National Tsing Hua University, Taiwan (1995). He is an
associate professor in the Department of Graphic Arts and Communications at
National Taiwan Normal University. He had been a postdoctoral researcher at
the Institute of Information Science, Academia Sinica, Taiwan, from 1995 to
- His research interests include spectral color imaging, color emotion, and
machine learning. (trchou@ntnu.edu.tw)
Jie-Yun  Shao  received  her  B.S.  degree  from  National  Taitung  University,
Taiwan, in 2021 and her M.S. degree from National Taiwan Normal University,
Taiwan, in 2023. Her research interests are in color generation, color images,
and so forth. (61072012H@gapps.nt nu.edu.t w)

---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, tdd, vcs, api]
