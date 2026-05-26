> **VERSION**: v1 | **Last Updated**: 26/05/2026



## Color Research & Application, 2025; 50:250–265
https://doi.org/10.1002/col.22975
## 250
## Color Research & Application
## REVIEW
## OPEN ACCESS
## Color Palette Generation From Digital Images: A Review
## Yafan Gao
## 1
## |  Jinxing Liang
## 1,2
## |  Jie Yang
## 3
## 1
School of Computer Science and Artificial Intelligence, Wuhan Textile University, Wuhan, China |
## 2
School of Design, University of Leeds, Leeds,
## UK  |
## 3
School of New Media, Beijing Institute of Graphic Communication, Beijing, China
Correspondence: Jinxing Liang (jxliang@whu.edu.cn)    |   Jie Yang (j.yang@bigc.edu.cn)
## Received: 3 April 2024 | Revised: 10 September 2024 | Accepted: 9 December 2024
Funding: This work was supported by National Natural Science Foundation of China (62305255), Natural Science Foundation of Hubei Province (No.
2022CFB537), Hubei Provincial Department of Education Science and Technology Research Program Youth Talent (No. Q20221706), and China Scholarship
## Council (202308420128).
Keywords: clustering | color difference | color palette | color space | neural network
## ABSTR ACT
Color palette is a critical component of art, design, and lots of applications, providing the basis for organizing and utilizing colors
to achieve specific objectives. However, generating color palettes from digital images presents unique challenges due to the com-
plexity of colors in images. This review comprehensively investigates various techniques for generating color palettes from digital
images and provides a thorough classification and discussion of these techniques from multiple perspectives. A color space must
be selected to generate a color palette, and a generation method must be employed. This paper offers a concise overview of color
spaces, an introduction to current palette generation methods, and an analysis of the metrics used to evaluate color differences
between palettes. The review encompasses traditional manual methods and computer- aided automation methods, further cate-
gorized as histogram- based, clustering- based, and neural network- based methods. Discussion on the strengths, weaknesses, and
applicability of existing methods are presented, and also opportunities for future research to enhance color palette generation
from digital images are identified.
## 1   |   Introduction
Kandinsky's  report  provides  insight  into  the  value  of  colors  in
design  [1].  It  identifies  two  types  of  values  that  colors  can  pro-
vide: visual value, which pertains to physical effects, and asso-
ciative value, which pertains to psychological effects. Research
suggests that visual stimuli account for almost 80% of the human
brain's  response  [2].  Market  research  conducted  by  the  China
Popular Colors Association indicates that appropriate color de-
sign  can  increase  a  product's  added  value  by  10%–25%  without
any additional costs. A study on design aspects found that color
is  the  most  frequently  mentioned  and  critical  factor  in  the  de-
sign process [3]. It also revealed that 70% of designers find color
selection  challenging.  These  studies  emphasize  the  important
role of color in design decisions.
Generally, the color palettes are first selected before the specific
color  scheme  is  defined.  For  color  palette  selection,  it  is  tradi-
tionally completed manually by referencing popular color charts
such as the Pantone chart. When generating a color palette, an-
other  key  consideration  is  determining  the  optimal  number  of
colors. Studies show that palettes with 5–6 colors often strike a
balance  between  complexity  and  usability.  A  5-  color  palette  is
typically  used  in  simple,  balanced  designs  like  web  pages  and
brand  logos  [4,  5].  Meanwhile,  a  6-  color  palette  is  more  suited
to  scenarios  requiring  richer  visual  effects  or  layers,  such  as
This is an open access article under the terms of the Creative Commons Attribution License, which permits use, distribution and reproduction in any medium, provided the original work is
properly cited.
© 2024 The Author(s). Color Research & Application published by Wiley Periodicals LLC.
Abbreviations: BMU, best matching unit; CNN, convolutional neural networks; CYS, Chinese youth subculture; FCM, fuzzy C- means; GAN, generative adversarial network; HSI, hue-
saturation- intensity; HSL, hue- saturation- lightness; HSV, hue- saturation- value; LLMs, large language models; LSTM, long short- term memory; MECDM, mean color- difference; MICDM,
minimum color difference; MSQE, mean square quantization error; NRGB, normalized RGB; RGB, red, green, blue; RL, reinforcement learning; SOM, self- organizing maps; SRCNN,
super- resolution convolutional neural network.

## 251
high-  end  fashion  design,  advertising,  or  film  color  grading
[6,  7].  However,  the  number  of  colors  can  significantly  impact
the  palette's  visual  harmony  and  practicality  across  different
fields. In recent years, the data- driven- based methods for color
palette  generation  from  color  images  have  been  paid  more  and
more attention as they can directly and automatically construct
color palettes from different types of color images. Color palette
generation  from  images  involves  transforming  a  vast  array  of
colors into a practical set, primarily by identifying dominant col-
ors in images, which now is widely applied in image processing
[8–11],  analysis  [12,  13],  computer  vision  [14],  and  more.  It  not
only assists in different tasks like web and product design, film
color  grading,  image  classification,  and  compression  but  also
helps to balance the image quality with efficiency in storage and
transmission.
When generating a color palette from images, two main issues
need  to  be  resolved.  First,  which  color  space  should  be  chosen
for  color  data  expression,  and  second,  what  kind  of  strategy
should be used to generate a color palette from images? A color
space is a way that is used to specify, create, and visualize col-
ors. Different color spaces that are used for color segmentation
include  RGB,  HSI,  CMY,  CMYK,  YIQ,  CIEXYZ,  CIEL*a*b*,
and  others.  However,  no  single  color  space  can  express  all  col-
ors  in  nature  scene,  and  each  color  space  has  its  advantages
and  disadvantages  [15].  The  mostly  used  RGB  color  space  is
device-  dependent,  while  the  CIEL*a*b*  color  space  is  visually
perception-  based,  where  “L”  represents  lightness,  and  “a”  and
“b” represents color component [16].
Based on the selected color space, different methods can be used
to generate a color palette from images, such as the traditional
manually-  based  method  and  the  current  hot  computer-  aided
methods.  During  the  investigation  of  the  current  color  palette
generation  methods,  we  not  only  focused  on  the  algorithms
but also investigated their application in different fields. At the
same  time,  the  complexity  of  color  selection  in  design,  innova-
tive image recoloring, and the significance of interior design and
molecular visualization are also presented. Through a compre-
hensive  investigation  and  analysis  of  palette  generation  algo-
rithms and their applications in related fields, the development
trends and future directions of palette generation technology are
discussed,  and  the  importance  of  combining  color  psychology,
culture,  and  technology  factors  in  palette  generation  is  ana-
lyzed. This will help us step into the dynamic interplay of color,
technology, and human perception, and also offer us a valuable
resource for understanding color palette generation in the digi-
tal era.
This review provides us with an overview of the most widely
used  algorithms  for  color  palette  generation,  as  well  as  a
detailed  analysis  of  their  pros  and  cons.  Organized  into  six
sections,  the  article  covers  a  range  of  topics,  starting  with
an  introduction  to  the  subject  in  Section 1.  In  Section 2,  we
explore  the  various  color  spaces  and  their  characteristics.
Section 3 delves into the concept of color difference between
palettes,  while  Section 4  provides  a  detailed  account  of  the
current  methods  available  for  generating  palettes,  including
both  traditional  manual  techniques  and  computer-  aided  au-
tomation  methods.  Specifically,  we  classify  computer-  aided
methods into three types: histogram- based, clustering- based,
and neural network- based. In Section 5, we discuss the differ-
ent  applications  of  color  palettes  and  their  classifications  in
the era of large models. Finally, in Section 6, we propose some
thought- provoking research topics and provide a summary of
the rev iew.
## 2   |   Color Spaces
Color  is  a  fundamental  component  of  visual  perception  and
plays  a  crucial  role  in  distinguishing  and  recognizing  infor-
mation.  Physically,  color  is  generated  through  the  reflection
of  specific  wavelengths  of  light  from  objects.  It  is  essentially
a  spectrum  of  electromagnetic  waves  within  a  specific  fre-
quency  range.  The  longest  wavelengths  correspond  to  the
color  red,  while  the  shortest  wavelengths  correspond  to  the
color  blue-  violet  (Figure 1).  To  describe  the  color  objectively,
we  need  mathematical  models  to  map  the  spectral  radiance
to  the  color  perception  of  the  human  visual  system,  which
encompasses  a  wide  range  of  hues  in  the  visible  spectrum  of
light. Therefore, a set of equations and/or rules will be defined
to  construct  the  model  to  express  color,  and  a  color  space  is
certainly developed to interpret the color attributes of the data
in  the  model  [17].  A  short  review  of  color  space  from  several
aspects is as follows.
## 2.1   |   Device- Dependent Color Spaces
Device-  dependent  color  spaces  are  mainly  divided  into  addi-
tive  color  spaces  and  perceptual  color  spaces.  Additive  color
spaces, like RGB [18], are created by mixing primary colors and
are widely used in displays and computer graphics due to their
simplicity, intuitive nature, and broad hardware and software
support. However, the non- linearity and sensitivity of RGB to
lighting  variations  complicate  hue  tracking  and  color  analy-
sis,  making  it  challenging  in  certain  applications.  The  nor-
malized  RGB  (NRGB)  color  space  improves  color  perception
under  varying  lighting  conditions  by  utilizing  proportional
amounts  of  the  three  primary  colors,  ensuring  that  the  sum
of  proportions  for  all  colors  is  always  100%  (Equations 1–3).
Additionally,  it  allows  any  color  to  be  described  using  only
two  primary  colors,  with  the  third  derived  as  the  difference
between  1  and  the  sum  of  the  other  two.  While  this  reduces
the  impact  of  lighting  variations,  it  diminishes  object  detec-
tion  capabilities  due  to  the  loss  of  contrast  provided  by  the
same illumination [19].
Perceptual color spaces like HSV, HSL, and HSI are designed
for  intuitive  color  handling,  providing  similar  hue  descrip-
tions but differing in saturation and lightness. HSL is immune
to  lighting  variations  due  to  its  lightness  component,  while
## (1)
r=
## R
## R+G+B
## (2)
g=
## G
## R+G+B
## (3)
b=
## B
## R+G+B
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 252
## Color Research & Application, 2025
HSV, though facing similar challenges, is preferred for its in-
tuitive  geometric  representation.  Some  studies  modify  these
models  by  ignoring  the  illumination  [20 –22]  or  saturation
[23, 24] components to reduce the impact of shadows or high-
lights,  focusing  solely  on  hue.  The  hue,  often  represented  as
an angle on a circle, can cause discontinuity issues, especially
near  red,  which  is  typically  addressed  by  using  dual  ranges
for hue. Additionally, when the maximum and minimum val-
ues of RGB are equal (corresponding to a grayscale tone), the
hue  has  an  undefined  value  (Equation 4).  Existing  software
libraries  often  set  it  to  zero  (red),  leading  to  incorrect  color
interpretations. Moreover, when the sum of the maximum and
minimum  values  of  RGB  is  2,  the  saturation  becomes  unde-
fined (Equation 5).
## 2.2   |   Device- Independent Color Space
Device- independent color spaces are designed to represent col-
ors consistently across different devices and media, ensuring
accurate color reproduction regardless of the specific hardware
involved.  One  of  the  most  fundamental  device-  independent
color   spaces   is   CIEXYZ,   developed   by   the   International
Commission  on  Illumination  (CIE).  CIEXYZ  is  based  on  the
human  visual  system  and  defines  colors  using  a  set  of  three
tristimulus  values  (X, Y, Z)  that  correspond  to  the  response
of the human eye to different wavelengths of light. This color
space serves as a foundation for many other color models and
is  widely  used  in  color  science  for  its  ability  to  represent  all
perceivable  colors.  Another  widely  used  device-  independent
color space is CIEL*a*b*, also developed by CIE, which is de-
rived  from  CIEXYZ  but  is  designed  to  be  more  perceptually
uniform,  meaning  that  the  perceived  differences  between
colors  are  more  consistent  across  the  spectrum.  CIEL*a*b*
represents  color  with  three  coordinates:  L*  for  lightness,  a*
for the red- green axis, and b* for the yellow- blue axis, making
it  a  popular  choice  for  applications  that  require  precise  color
matching, such as digital imaging and printing.
More advanced models, such as CIECAM02 [25], extend the ca-
pabilities  of  device-  independent  color  spaces  by  incorporating
contextual  information  such  as  the  surrounding  environment
and  viewing  conditions,  providing  a  more  comprehensive  ap-
proach  to  color  appearance  modeling.  CIECAM02  is  particu-
larly useful in applications where the perception of color can be
significantly influenced by external factors, such as in lighting
design or visual ergonomics. By accounting for these variables,
CIECAM02 offers a more accurate prediction of how colors will
appear  under  different  conditions,  making  it  a  valuable  tool
for  industries  that  require  meticulous  color  control.  Moreover,
with the increasing importance of color management in digital
workflows,  the  use  of  device-  independent  color  spaces  has  be-
come essential for ensuring that colors remain consistent from
design to final output, whether in print, on screens, or in other
visual media.
## (4)
## H=
## ⎧
## ⎪
## ⎪
## ⎪
## ⎨
## ⎪
## ⎪
## ⎪
## ⎩
## 60∗
## �
## G−B
max
## (
## R,G,B
## )
## −min
## (
## R,G,B
## )
## �
## R=max
## (
## R,G,B
## )
## 60∗
## �
## 2+
## (
## B−R
## )
max
## (
## R,G,B
## )
## −min
## (
## R,G,B
## )
## �
## G=max
## (
## R,G,B
## )
## 60∗
## �
## 4+
## (
## R−G
## )
max
## (
## R,G,B
## )
## −min
## (
## R,G,B
## )
## �
## B=max
## (
## R,G,B
## )
## (5)
## S=
max
## (
## R,G,B
## )
## −
min
## (
## R,G,B
## )
## 1−∣(max
## (
## R,G,B
## )
## +min
## (
## R,G,B
## )
## −1∣
## (6)
## L=
max
## (
## R,G,B
## )
## +min
## (
## R,G,B
## )
## 2
FIGURE 1    |    Visible spectrum (wavelengths in meters).
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 253
3   |   Color Difference of Color Palettes
The color difference between color palettes is developed to com-
pare the color inconsistency between two palettes. Imagine that
we  have  several  color  palettes  extracted  from  an  image  using
different  computational  methods  and  want  to  decide  which  of
these  palettes  best  matches  a  color  palette  extracted  visually.
We therefore need a method for estimating the color difference
between  two  palettes.  This  is  not  so  easy  as  several  colors  are
included in each color palettes.
Tokumaru,   Muranaka,   and   Imanishi   published   their   work
on  the  evaluation  of  a  color  scheme's  harmony  in  the  early
stage  [26].  Besides  the  application  of  color  schemes  in  product
and  interior  design,  color  palettes  can  also  be  applied  in  color
image  quantization  in  computer  graphics  and  image  process-
ing [27–29]. Image and video quality is often assessed by image
comparison  [30].  The  image  comparison  often  involves  pixel-
by- pixel comparison when the images display the same content
or  scene.  Other  image  comparison  metrics  include  key-  point
matching [31], histogram method [32], and key- point + decision
tree [33], and so forth.
The problem of color palette difference is analogous to the prob-
lem  of  color  difference  prediction  of  pairs  of  color  patches,  the
traditional  color  difference  problem  can  be  considered  to  be  a
special case of a more general problem where we need to com-
pare a pair of several patches (i.e., palettes). Much research has
been  conducted  on  this  special  case,  such  as  the  evaluation  of
color difference between homogeneous colors [34–36]. For a pair
of  homogeneous  color  samples  or  two  complex  images  viewed
under  specific  conditions,  color  difference  formulas  try  to  pre-
dict the visually perceived (subjective) color difference from in-
strumental (objective) color measurements.
The  last  50  years  have  seen  several  color-  difference  formulas
being  published;  the  majority  of  these  are  based  on  CIEL*a*b*
color   space,   including   CIE94,   CMC,   and   most   recently
CIEDE2000,  which  is  the  current  CIE  recommendation  for
small color difference [37].
Pan  and  Westland  conducted  a  psychophysical  experiment
with pairs of color palettes, each palette containing 25 differ-
ent  color  patches  [38].  In  their  study,  three  different  palette-
difference metrics were tested using the psychophysical data.
The  metrics  tested  were:  (1)  Single  color-  difference  model
(where  the  RGB  values  of  each  palette  were  averaged  and  a
single  color  difference  was  calculated  between  the  palettes);
(2) mean color- difference model (MECDM, where each patch
in one palette was compared to the patches in the second pal-
ette  and  the  mean  of  all  of  these  color  difference  was  calcu-
lated);  and  (3)  minimum  color-  difference  model  (MICDM,
where  each  patch  in  a  palette  was  compared  with  its  closest
color  in  another  palette  and  the  mean  of  these  color  differ-
ences was calculated). From their research result, we can see
that MICDM outperformed the other two metrics based on all
analyses. After that, they further explored methods for auto-
matically  predicting  visual  similarity  between  palettes  [39].
The color difference between the palettes was predicted using
two algorithms, each based on one of six color- difference for-
mulas. The best performance was obtained using the MICDM
and the CIEDE2000 equation with a lightness weighing of 2,
the  results  are  summarized  in  Table 1.  In  their  latest  study,
three psychophysical experiments were conducted to compare
the  newly  proposed  Hungarian  model  with  the  MICDM  and
the MECDM. The results indicate that both the MICDM and
the Hungarian model outperform the MECDM in terms of fit-
ting visual data. Furthermore, the study also reveals that the
MICDM  and  the  Hungarian  model  are  statistically  indistin-
guishable [40].
## 4   |   Color Palettes Generation Methods
In  this  section,  we  discuss  the  color  palette  generation  meth-
ods  of  traditional  manual  and  computer-  aided  automation.  For
computer- aided automation methods, which include histogram-
based,    clustering-    based,    and    neural    network-    based    ones.
Methods  of  color  palette  generation  are  classified  as  follows
(Figure 2).
## 4.1   |   Traditional Manual Methods
Color  palette  selection  is  manually  related  to  the  color  interac-
tion  [41]  on  visual  perception.  The  visual  effects  produced  by
different colors vary, with warm colors evoking a sense of liveli-
ness and warmth, and cool colors creating feelings of calmness
and refreshment. The contrast between colors can impact peo-
ple's  perception  of  them,  affecting  factors  such  as  brightness,
saturation, and temperature. Thus, when designing, it is import-
ant to select colors that are suitable for the content and emotion
of the image, while also taking into account their performance
in various backgrounds and environments. By doing so, design-
ers can create effective and impactful designs that resonate with
their intended audience.
The  advantage  of  manually  selection  of  color  palettes  is  that
they allow designers to use colors more flexibly and customize
their  color  schemes  according  to  their  preferences  and  styles.
However,  hand-  extracted  palettes  also  have  some  limitations,
such  as  they  may  be  influenced  by  personal  preferences  and
experiences,  or  they  may  ignore  some  details  and  changes.
Therefore, designers still need to refer to some professional color
guides  and  tools  when  using  hand-  extracted  palettes,  such  as
Pantone charts, RGB and CMYK color space, and so forth [42].
Traditional  methods  of  manually  generating  color  palettes  in-
volve the following steps [43]: selecting a base color, determining
the type of palette, choosing a color scheme, and adjusting and
optimizing. The workflow is as below, and detail of each step is
presented (Figure 3).
Step 1: Selecting a base color. When manually creating a color
palette, the first step is to choose a base color as a starting point.
The  base  color  can  be  a  primary,  a  theme,  or  a  specific  refer-
ence color.
Step  2:  Determining  the  type  of  palette.  Based  on  the  re-
quirements or the design goals, the desired type of color palette
is determined. The palette type can be monochromatic, comple-
mentary, poly- chromatic, gradient, and so on. Each type has dif-
ferent effects and application scenarios.
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 254
## Color Research & Application, 2025
Step  3:  Choosing  a  color  scheme.  After  determining  the
type of palette, the next step is to select a suitable color scheme
within  that  palette  type.  This  involves  choosing  additional
colors that harmonize with the base color and align with the
selected palette type. For example, if the palette type is mono-
chromatic, variations of the base color would be chosen. If it is
complementary, colors opposite to the base color on the color
wheel  would  be  selected.  This  step  ensures  coherence  and
unity  within  the  palette  while  also  considering  the  intended
aesthetic or message.
Step  4:  Adjusting  and  optimizing.  Once  an  initial  color
scheme  is  chosen,  adjustments  and  optimizations  can  be  made
to  refine  the  color  palette.  Fine-  tuning  of  colors  can  be  per-
formed,  such  as  adjusting  hue,  saturation,  brightness,  and  so
forth, to achieve better color combinations and effects. Neutral
colors can be added, and certain colors can be added or removed
to  enhance  overall  balance  and  harmony.  Contrast  adjustment
is also an important aspect of adjusting the color palette, where
increasing  or  decreasing  color  contrast  can  change  the  overall
effect.
It should be noted that the traditional manual methods rely on
subjective judgments and aesthetic viewpoints, emphasizing the
experience and intuition of artists. Even though they are widely
used in design and art fields to create unique and personalized
color  palettes,  they  face  limitations  such  as  time-  consuming
nature,  subjectivity,  and  difficulty  in  meeting  large-  scale  and
rapid  generation  requirements.  With  the  development  of  com-
puter   technology,   automated   methods   for   generating   color
palettes  have  gained  attention  and  found  wide  applications  in
recent years.
TABLE 1    |    Calculation of r
## 2
and STRESS values for the six color- difference equations and the two algorithms of MICDM and MECDM [39].
r
## 2STRESS
## ∆E
m
## —MECDM∆E
p
## —MICDM∆E
m
## —MECDM∆E
p
## —MICDM
## CIELAB0.3450.82143.119.33
## C MC (1,1)0.2130.76841.8722.99
## C MC (2 ,1)0.2560.81244.0619.31
## CIE940.2810.76845.5422.69
## CIE2000 (1,1,1)0.3250.83240.3418.92
## CIE20000 (2,1,1)0.3920.86439.2916.93
FIGURE 2    |    Diagram of color palette generation methods classification.
FIGURE 3       |    Flowchart and principles for traditional manual- based color palette generation methods.
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 255
## 4.2   |   Computer- Aided Automation Methods
## 4.2.1   |   Histogram- Based Methods
The  basic  idea  of  the  histogram-  based  color  palette  generation
method is to convert the color information of image pixels into
a  histogram  and  then  identify  the  most  frequent  colors  in  the
histogram  as  the  dominant  colors  of  the  image.  Specifically,
for  a  color  image,  we  can  split  it  into  the  three  RGB  channels
and then compute the histogram for each channel, resulting in
three  single-  channel  histograms  (as  shown  in  Figure 4).  Next,
we combine the three histograms to create a merged histogram.
In  the  merged  histogram,  the  color  with  the  highest  frequency
represents the dominant color of the image.
Delon et al. proposed an algorithm that identifies spatial regions
in natural images based on the peaks in the hue, saturation, and
value histograms [44, 45]. This approach extracts color themes,
but  the  resulting  sets  may  contain  redundant  colors  due  to  its
hierarchical  nature.  Morse  et  al.  also  employed  a  hierarchical
histogram method to extract color themes, but they added con-
straints on the maximum number of colors and the color distance
[46].  However,  they  did  not  provide  user  or  quantitative  evalu-
ations  to  compare  their  themes  with  other  methods.  Although
histogram-  based  methods  for  extracting  the  main  colors  of  an
image are simple and easy to implement, they have some limita-
tions. First, this method does not consider the brightness infor-
mation of colors, so the extracted main colors may not align with
human visual perception. Second, it cannot handle cases of non-
uniform color distribution, as it may result in the most frequent
colors in the histogram not being representative of the image.
## 4.2.2   |   Clustering- Based Methods
Clustering-   based   methods   are   one   of   the   mainstream   ap-
proaches  for  color  palette  extraction.  This  method  divides  the
color space into different regions and clusters colors into groups
or categories. Then, representative colors are selected from each
cluster  to  form  the  color  palette.  The  commonly  used  cluster-
ing  algorithms  for  this  color  palette  generate  include  K-  means,
fuzzy C- means (FCM), and self- organizing maps (SOM).
4.2.2.1   |   K- Means. The K- means algorithm is one of the most
popular algorithms [47]. It aims to find K clusters by minimizing
the  mean  square  quantization  error  (MSQE)  of  the  sample  set
with the set number of clusters. The algorithm attempts to locate
K prototypes (centroids) across the entire sample set, in order to
best  represent  the  data  to  some  extent.  The  K-  means  algorithm
can cluster all the pixels in the color space into a specified num-
ber of clusters, and then select the average color of each cluster as
the colors on the color palette. Barbakh, Ying, and Colin summa-
rized the K- means algorithm as follows [48] (Figure 5).
FIGURE 4    |    Histograms of RGB channels of an image.
FIGURE 5    |    Diagram of K- means algorithm steps.
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 256
## Color Research & Application, 2025
Although the K- means is now widely used in different areas, it is
always have some issues need to be improved. First, it is highly
sensitive  to  the  selection  of  initial  cluster  centers,  which  can
lead to different clustering results with different initial centers.
Second, it is sensitive to outliers, which may affect the accuracy
of clustering results. Additionally, it is assumed that all clusters
have  the  same  variance  and  the  clustering  shape  is  spherical,
which may not always hold true.
4.2.2.2   |   Fuzzy C- Means.    To    address    the    issues    in
the K- means method, we have the optimized FCM method. The
FCM  algorithm  is  proposed  by  Bezdek  and  aims  to  optimize
image colorization errors [49, 50]. Unlike K- means, FCM allows
each  data  point  to  belong  to  multiple  clusters  rather  than  just
one.  This  soft  clustering  approach  is  more  suitable  for  handling
data uncertainty and boundary fuzziness. Moreover, FCM is less
sensitive  to  the  selection  of  initial  centers  and  does  not  restrict
the  shape  of  clusters,  thus  offering  more  flexibility  to  adapt  to
different  data  distributions.  In  summary,  FCM  often  outper-
forms  the  K-  means  when  dealing  with  data  containing  noise
or uncertainty.
Since  the  FCM  method  (Figure 6)  was  proposed,  it  received
extensive  attention  and  research  from  scholars  on  the  second
floor.  Ahmed  introduced  distance  information  to  optimize
pixel membership degrees in the FCMS algorithm [51]. Szilagyi
weighted feature attributes of adjacent pixels in the EnFCM al-
gorithm [52]. Chen and Zhang optimized the FCMS algorithm
by incorporating mean and median values, resulting in FCMS1
and FCMS2 algorithms [53]. Zhao replaced mean and median
filtering with non- local means filtering in FCMS1 and FCMS2,
proposing  an  algorithm  with  self-  adjustable  non-  local  spatial
information  [54].  Krinidis  and  Chatzis  introduced  fuzzy  fac-
tors and developed the FLICM algorithm for noise image seg-
mentation  [55].  Gong  incorporated  texture  features  into  the
FLICM  algorithm,  considering  spatial  information  [56].  Du
and Wu replaced Euclidean space with the reproducing kernel
Hilbert  space  in  the  kernel  space  intuitionistic  fuzzy  cluster-
ing  algorithm  [57].  Leski  introduced  M-  estimators  and  OWA
operators in the FCOM algorithm, improving robustness at the
cost of increased computation time [58]. Liu enhanced FCOM
with  noise  resistance,  range-  normalized  feature  weighting,
and improved computational speed, resulting in the FWFCOM
algorithm [59].
4.2.2.3   |   Self- Organizing   Maps.  The  FCM  algorithm  has
achieved  extensive  research  and  application  in  image  process-
ing but still faces issues such like it do not considering the topo-
logical structure of the sample set, and not achieving nonlinear
mapping  of  the  sample  set,  which  makes  it  limited  for  more
complex data. The efficiency of traditional clustering is relatively
low  when  processing  large-  scale  datasets.  Therefore,  the  new
method of SOM was came up to deal with the issues existing in
previous  methods  [60].  It  is  more  efficient  to  process  unlabeled
sample sets and well adapt to the sparsity of sample spaces, mak-
ing  it  demonstrate  superior  performance  and  applicability  over
traditional  clustering  algorithms  across  various  aspects.  The
SOM algorithm consists of an input layer and a competitive layer.
During the network training phase, the initial network structure
is defined based on the input data size and desired output. The
network  nodes'  weight  vectors  are  then  trained  in  an  unsuper-
vised  manner  using  the  input  data  sequence.  Detailed  steps
of SOM are presented in Figure 7.
Many  researchers  use  the  SOM  for  clustering  segmentation  of
color images. Among them, Ong proposed a two- stage competi-
tive network segmentation method based on the CIE color space
[61].  The  algorithm  first  establishes  a  fixed  two-  dimensional
structured  feature  network  as  the  competitive  layer  to  capture
the  main  colors  of  the  image.  In  the  second  stage,  a  variable-
sized one- dimensional network structure is used to control the
number of clusters and achieve segmentation. Chang et al. in-
troduced a frequency- sensitive competitive learning strategy for
color quantization [62]. This method optimizes the main color
palette  using  the  SOM  network  and  imposes  constraints  on
FIGURE 6    |    Diagram of fuzzy C- means algorithm steps.
FIGURE 7    |    Diagram of SOM algorithm steps.
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 257
data input using a butterfly permutation sequence pattern. The
frequency-  sensitive  model  is  particularly  suitable  for  adjust-
ing  the  strategies  of  neighboring  neurons.  Yeo  et  al.  proposed
a  combination  of  self-  organizing  map  network  and  adaptive
resonance  theory  (ART)  [63].  The  algorithm  utilizes  plasticity-
adjusting  parameters  to  constrain  the  network,  resolving  the
contradiction   between   stability   and   structural   invariance.
Wang, Lee, and Hsieh suggested constructing the network based
on  the  scale  of  the  input  data  samples,  where  the  parameters
and neighborhood function of the network are controlled by the
sample quantity [64].
4.2.2.4   |   Application  of  the  Clustering  Methods.    The
application instance of the above clustering methods is further
investigated and summarized. In a study by Mathur and Purohit,
the K- means clustering algorithm was applied to various images
in  different  color  spaces:  RGB,  CIEL*a*b*,  YCbCr,  and  HSV
color  spaces  [65].  From  the  study,  it  can  be  concluded  that
the CIEL*a*b*and YCbCr color spaces provide the best segmen-
tation of color images based on color components. Among these
two color spaces, CIEL*a*b* color space is widely accepted as its
execution time is shorter even in scenarios with a large number
of color components in the image.
In a study by Hu et al., two schemes were proposed for designing
color image quantization palettes [66]. The first scheme, initially
proposed by Hu et al., generates the palette gradually through a
process of cell splitting and pixel grouping. The second scheme
employs the K- means clustering algorithm using the initial pal-
ette  generated  by  the  first  scheme.  Experimental  results  show
that the second scheme has a lower computational cost but pro-
vides  a  better  color  palette  compared  to  the  first  scheme.  Both
schemes are suitable for real- time multimedia applications due
to their low computational cost.
Shmmala  and  Ashour  conducted  color-  based  image  segmenta-
tion using K- means, weighted K- means, and inverse weighted K-
means clustering algorithms in the CIEL*a*b* and RGB spaces
[67]. They found that K- means and its related versions are highly
sensitive  to  noise,  while  inverse  weighted  K-  means  with  a  low
noise  level  yields  the  best  results.  However,  under  moderate
noise  levels,  all  mentioned  versions  produce  similar  results,
while  for  larger  noise  levels,  both  K-  means  and  its  related  ver-
sions fail to provide accurate segmentation.
Arumugadevi and Seenivasagam compared the performance of
K-  means,  FCM,  and  SOM  algorithms  and  found  that  the  FCM
clustering algorithm performs better when applied to CIEL*a*b*
color  reduced  images,  while  the  trained  SOM  network  reduces
the execution time of color image segmentation [68]. In terms of
color image segmentation, both FCM and SOM algorithms out-
perform the K- means algorithm.
The main issue with the K- means algorithm is its dependence on
prototype initialization. If the initial prototypes are not carefully
selected,  the  computation  may  converge  to  a  local  minimum
instead  of  the  global  minimum.  Therefore,  proper  initialization
of  prototypes  can  have  a  significant  impact  on  the  outcome  of
K- means.
## 4.2.3   |   Neural Network- Based Methods
A generic neural network structure is a foundational architec-
ture  for  building  artificial  neural  networks,  consisting  of  an
input layer, hidden layers, and an output layer. The input layer
receives  raw  data,  hidden  layers  process  the  data  through
neurons  with  weights  and  activation  functions,  and  the  out-
put layer generates the final result, such as classification or re-
gression. Each neuron processes inputs and passes the result
to  the  next  layer.  This  flexible  structure  is  widely  applied  in
areas like image recognition and natural language processing.
The neural network- based color palette generation method is
an approach that utilizes deep learning techniques to generate
color  schemes.  This  method  involves  training  a  neural  net-
work to learn and capture color features from a large amount
of color data and then generate new palettes that meet design
requirements.
In  recent  years,  neural  network-  based  color  palette  generation
methods have gained popularity for their ability to generate di-
verse  and  customizable  color  schemes  to  meet  design  require-
ments. However, these methods also pose some challenges, such
as data collection and processing difficulties, as well as the com-
plexity  of  the  neural  network  model.  Despite  these  challenges,
various  neural  network  methods  have  emerged,  each  with  its
strengths  and  weaknesses  (as  shown  in  Table 2).  While  some
methods excel in certain aspects, they may fall short in others.
To overcome these limitations, it is a common practice to com-
bine  multiple  neural  network  methods  to  maximize  the  effec-
tiveness  of  color  palette  extraction  (as  shown  in  Table 3).  This
kind of approach not only enhances flexibility but also ensures
the  consideration  of  visual  context,  which  is  often  overlooked
in predefined palettes. Designing an effective palette remains a
time- consuming and challenging process, even for experts, un-
derscoring the importance of leveraging diverse neural network
techniques.
Liu  et  al.  [69]  proposed  an  image-  driven  color  generation
method  that  leverages  human  perception  to  create  visually
appealing  palettes  by  analyzing  constraints  like  harmony,
distinction,  and  context.  Their  unique  approach  uses  a  color
clustering  method  based  on  visual  saliency  and  hue  values,
enabling   finer   color   extraction   from   main   subjects.   This
method  generates  harmonious  palettes  tailored  to  different
visualization contexts, with two strategies for color optimiza-
tion and allocation designed for various data types, encoding
colors into the visualization accordingly. Detail of the method
is plotted in Figure 8.
However,  due  to  the  variability  of  colors  and  the  influence  of
various  light  sources,  precise  analysis  of  colors  becomes  chal-
lenging.  Traditional  methods  address  this  issue  by  reducing
the  color  range  or  clustering  pixel  values  [70,  71],  but  classifi-
ers  can  only  categorize  colors  rather  than  provide  specific  and
accurate  representations.  Kim  and  Kang's  classifiers  can  only
categorize  colors  rather  than  propose  a  color  palette  extraction
system  based  on  a  generative  adversarial  network  (GAN)  with
chroma  fine-  tuning  and  reinforcement  learning.  The  system
aims to find a method that represents colors themselves, similar
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 258
## Color Research & Application, 2025
to  a  color  palette,  to  help  identify  color  combinations  that  rep-
resent the input image [72]. Feature maps are generated from a
4-   channel (RGBY) image using a network validated by SRCNN,
capturing  hidden  pixel-  level  information.  GAN  then  generates
color   palettes,   optimizing   combinations   through   generator-
discriminator  interaction,  while  reinforcement  learning  ad-
justs chroma by modifying the Y component in the YCbCr color
space, as is shown in Figure 9.
They  also  compared  the  performance  of  the  K-  means  clus-
tering algorithm, the ColorMind method, and their proposed
method   using   different   backbone   networks   (i.e.,   EDSR,
MDSR, and RDN, which are commonly used in image super-
resolution)  and  with  or  without  chroma  fine-  tuning.  The
results  are  shown  in  Table 4,  where  it  is  evident  that  their
proposed method significantly outperforms the K- means clus-
tering  algorithm  and  the  ColorMind  method  in  terms  of  ex-
traction accuracy. The experiments demonstrate a successful
generation  of  color  palettes  both  quantitatively  and  qualita-
tively, with an accuracy of 0.9140.
While  ColorMind  attempts  to  perform  color  filling  using
conditional  adversarial  networks,  PaletteNet  aims  to  recolor
images  using  a  given  color  palette  [73],  and  Text2color  fo-
cuses on generating color palettes from given sentences using
deep  learning  [74].  However,  none  of  these  methods  have  at-
tempted to generate color palettes directly from given images.
Moussa  and  Watanabe  introduce  the  use  of  adversarial  vari-
ational  auto-  encoders  to  generate  and  extract  color  palettes.
As  is  shown  in  Figure 10,  the  overall  structure  of  the  varia-
tional  auto-  encoder  also  consists  of  three  main  parts,  a  con-
volutional  encoder,  a  middle  sampling  layer  that  allows  the
generation of latent codes, and a bidirectional long short- term
memory  (LSTM)  decoder  that  generates  color  palettes  based
on  the  latent  codes  [75].  Two  discriminators  are  employed
in  the  model,  one  learns  to  assess  the  matching  between  the
color palette and the input image, and the other evaluates the
color palette itself. In addition, a supplementary noise vector
is  fed  into  the  decoder,  enabling  the  generation  of  different
color palettes for the same latent vector.
The main limitation of the above- proposed model is its reliance
on  data-  driven  approaches,  where  the  quality  of  the  training
data largely determines the quality of the model. There is room
for improvement in terms of color accuracy. While experts may
take  several  minutes  to  create  a  palette  from  a  random  image,
TABLE 2    |    Comparison of mainstream neural network- based color palette generation methods.
## Type
of the
methodsAdvantagesDisadvantages
CNN based
## [75]
- It can extract complex features from images.
- It can undergo end- to- end training, resulting in good
training performance.
- It is suitable for processing large- scale image data and
has good scalability.
- Training requires a large amount of data and
computational resources.
- It requires a longer training time, which can be
slow for real- time processing.
- It is influenced by the network structure and
may suffer from over- fitting issues.
GAN based
## [72]
- By employing generative adversarial learning, we can
effectively capture the distribution patterns of images,
leading to improved accuracy in extracting dominant
colors.
- It exhibits good performance in handling large- scale
datasets.
- This approach can be extended to other domains
beyond color extraction, such as image generation, where
GANs have shown promising results.
- The training process of GANs can be complex
and requires a large amount of computation.
- There may be challenges such as training
instability and inconsistency in generated results,
which can affect the reliability of color extraction.
- GANs are susceptible to mode collapse, where
the generator fails to capture the full diversity
of the image distribution, leading to suboptimal
performance in extracting dominant colors.
## Attention
based [76]
- It allows for processing at the pixel level, resulting in
high precision.
- It enables extracting main colors from different regions
of the image, providing more flexibility.
- It has a lower computational requirement, resulting in
faster processing speed.
- Manual design of attention mechanisms
is required, and improper design may lead to
suboptimal results in main color extraction.
- There might be issues with excessive or
insufficient attention, which can affect the
accuracy of main color extraction.
- It may not be as effective for complex image
structures.
## Auto
encoder
based [75]
- Feature extraction can be performed while preserving
the integrity of the image.
- The training process is relatively simple and requires
less computational operations.
- It is well- suited for small- scale datasets.
- Auto encoders may potentially lose some
important information in the image, which can
affect the accuracy of extraction for main colors.
- They struggle to handle complex image
structures and have limitations in processing large-
scale image datasets.
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 259
the proposed framework can suggest one or multiple provisional
palettes instantly.
5   |   Overview of the Color Palette Generation
5.1   |   Classification of the Applications
The past years have witnessed the application of color palettes in
a wide range of fields, a coarse classification of the applications
of  color  palettes  is  summarized  in  Table 5,  with  a  summary  of
method  characteristics  and  the  foreseeable  development  trends
of each application.
5.2   |   Color Palette Generation in the AI Era
In  recent  years,  AI  has  experienced  significant  development
in   the   field   of   language   processing,   particularly   with   the
emergence  of  large-  scale  pre-  trained  models  such  as  BERT
[77],  RoBERTa  [78],  T5  [79],  DeBERTa  [80],  and  GPT-  2  [81].
A  key  feature  of  these  models  is  their  significant  progress  in
TABLE 3    |    Comparison of multiple neural network models.
ModelsStructuresCharacteristics
Liu et al. [69] (Figure 8)CNN: Used for extracting image features.
Fully Connected Layers: Map the
extracted features to palette generation.
## Palette Generation Module:
Generates and optimizes the palette
based on the extracted features.
Image- Driven: Utilizes image
features to generate and optimize
palettes, ensuring harmony
with the image content.
Diversity: Capable of
generating diverse palettes
suitable for various information
visualization needs.
Kim and Kang [72] (Figure 9)GAN: Used for generating initial palettes.
RL: Used for fine- tuning chroma
information and optimizing the palette.
RGBY Image Processing: Creates feature
maps using RGBY images and generates
palettes through fully connected layers.
## Chroma  Fine- Tuning: Fine-
tunes chroma information
through reinforcement learning,
ensuring the accuracy and
consistency of the palette.
High Precision: The generated
palettes excel in color accuracy,
suitable for fields requiring
precise color analysis.
Moussa and Watanabe [75] (Figure 10)VA E: Used for learning low- dimensional
representations of images.
GAN: Used for generating realistic palettes.
## Adversarial Training: The
generator and discriminator improve
through adversarial training.
## Dual Model: Combines
the strengths of VAE and
GAN, capable of both feature
extraction and high- quality
palette generation.
Diversity and Realism:
Generates palettes that are both
diverse and realistic, suitable for
various application scenarios.
FIGURE 8       |    Steps of image- driven harmonious color palette generation method for diverse information visualization [69].
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 260
## Color Research & Application, 2025
understanding  and  generating  a  diverse  range  of  languages.
For instance, they are better at understanding contextual infor-
mation  and  demonstrating  more  coherent  and  contextual  lan-
guage comprehension abilities. Additionally, with the increase
in model size and the unification of technology, large language
models (LLMs) like GPT- 3 [82] have emerged, integrating var-
ious  language  understanding  and  generation  tasks  into  a  uni-
fied framework.
The  recent  advent  of  AI  models  such  as  ChatGPT  [83]  and
GP T- 4  [84] signifies a notable advancement in AI's ability to un-
derstand  and  follow  human  intentions.  These  models  not  only
excel in various language tasks but also interact better with hu-
mans, showing an understanding of and adaptability to human
instructions,  laying  a  new  foundation  for  the  future  develop-
ment of artificial intelligence. The era of large models provides
us  with  powerful  tools  for  processing  and  generating  complex
data, including images, which can be applied to the creation of
image color palettes. Some studies have already started to focus
on the applications of this aspect.
A  study  carried  out  by  Li  et  al.  addressed  the  often  overlooked
cultural aspects in algorithmic color palette generation and col-
orization [85]. It emphasizes the unique aesthetic and semantic
characteristics of the Chinese Youth Subculture (CYS), a vibrant
group among the Gen Z population in China. This study devel-
opment of a unique open dataset inspired by CYS, incorporating
images,  color  palettes,  text,  and  categories,  the  introduction  of
a multi- modal generative architecture for culture- inspired color
palette generation and colorization, and the creation of a demo
system  that  uses  human-  in-  the-  loop  principles  for  constant
feedback and system evolution.
Another research completed by Qiu, Wang, and Otani presented
a  multimodal  masked  color  model  to  provide  text-  aware  color
recommendations  in  graphic  document  design  [86]. The model
integrates  both  color  and  textual  contexts  using  self-  attention
and cross- attention networks and is applicable for color palette
completion  and  full  palette  generation.  The  proposed  method-
ology  presents  numerous  key  benefits.  It  implements  a  multi-
modal  masked  color  model  that  merges  color  and  CLIP-  based
textual representations, making it suitable for both color palette
completion and complete palette generation. The model outper-
forms existing methods in terms of precision, color distribution,
user  engagement,  color  variety,  and  likeness  to  authentic  color
palettes,  as  demonstrated  by  thorough  experiments  and  user
studies across different design scenarios.
In  summary,  the  latest  advancements  in  artificial  intelligence
have sparked numerous ideas and methods that show great po-
tential, especially in the realm of generating image color palettes
(as  shown  in  Figure 11).  With  the  rapid  pace  of  technological
progress, we can expect even more groundbreaking methods to
emerge in this field.
FIGURE 9      |    The overall workflow of the proposed color palette extraction: (a) Generating feature maps from RGBY input image, (b) generating
the color palette using GAN, (c) fine- tuning the chroma through reinforcement learning, and (d) outputting the color palette [72].
TABLE 4    |    Accuracy comparison of the proposed method at different
numbers of correctly identified color blocks [72].
## Methods
The number of
correct  color- patch
## 345
K- mea n  cluster ing0.62140.58240.5203
ColorMind0.73210.65320.6252
Backbone- EDSR  without
fine- tuning
## 0.92520.88340.8585
Backbone- EDSR  with
fine- tuning
## 0.93540.89220.8712
Backbone- MDSR  without
fine- tuning
## 0.95040.90240.8801
Backbone- MDSR  with
fine- tuning
## 0.95780.91260.8968
Backbone- RDN  without
fine- tuning
## 0.97020.92230.9013
Backbone- RDN  with
fine- tuning
## 0.97450.92720.9180
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 261
FIGURE 10    |    CNN- VAE- LSTM- GAN color palette generation network architecture [75].
TABLE 5    |    Classification of the current application of color palette.
ApplicationsCharacteristics of methodsTrend of development
Graphic and interior design [2, 12, 43]Applying color palettes to brand
packaging, furniture arrangement
and color matching, emphasizing
the visual and emotional
effects of color in design.
Digital technology and AI may be used more
to optimize the design process, achieving
personalized and efficient color selection.
Medical imaging [9, 16]Color palettes enhance the
clarity and interpretability
of medical images.
Deep learning will be integrated to improve
the accuracy and efficiency of image analysis.
Fashion industry [13]Using color palettes to generate and
analyze fashion industry trends,
through machine learning to
process fashion collection images.
We may see more applications that
combine big data and trend forecasting,
in order to more accurately predict
and respond to market changes.
Data security and encryption [10, 27]The application of color palettes in
data hiding and image encryption,
highlighting its importance in
the field of information security.
More advanced encryption technologies will
be developed to protect sensitive information.
Information visualization [14, 69]Using color palettes in molecular
visualization and diversified
information visualization,
emphasizing the necessity
of proper color selection.
More research will focus on user
interface friendliness and accessibility,
making information easier to
understand and communicate.
Art and color theory [1, 41, 42]Explore the importance of color in
artistic expression and aesthetics.
Color may be studied more deeply in
relation to human emotions and culture.
Image pattern recognition [21–24, 26]Apply color theory to image
recognition and pattern analysis.
Image pattern recognition may
achieve significant improvements
in accuracy and efficiency.
Image recoloring [8, 73, 74]Use advanced technologies to
change the color style of images,
for beautification, artistic
creation or data visualization.
Image recoloring techniques may be
applied more to multimedia, entertainment
and advertising industries.
Color quantization [11, 15, 17, 18, 28, 72]Color quantization processing of
images, for image compression,
optimization and analysis.
Color quantization techniques
may play a greater role in image
storage and transmission.
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 262
## Color Research & Application, 2025
## 6   |   Conclusion
In this review, we provide an overview of color palette extraction
research,  introducing  the  main  color  palette  generation  algo-
rithms  and  their  applications.  Color  palette  extraction  is  an  im-
portant  research  area  in  computer  vision  and  image  processing,
with  wide-  ranging  applications  in  image  retrieval,  image  seg-
mentation, image compression, image editing, and artistic design.
Many  studies  [8–12]  highlight  the  role  of  advanced  compu-
tational  methods  like  machine  learning,  deep  learning,  and
data- driven approaches in enhancing color palette generation
and image processing. Some researches [1, 2, 41–43] focus on
the  application  of  color  palettes  in  artistic  and  design  con-
texts,  emphasizing  their  importance  in  conveying  aesthetic
and  emotional  content.  Many  papers  [16 –20]  delve  into  the
exploration and utilization of various color spaces for effective
color  segmentation  and  palette  generation.  Development  of
automated and interactive tools for color palette generation is
a common theme [44–47, 73, 74], facilitating easier and more
efficient  color  selection  for  non-  experts.  Although  computer-
based  color  palette  generation  methods  have  many  advan-
tages, they still have limitations.
- Limitations  of  training  data.  Methods  based  on  statis-
tics,  artificial  neural  networks,  and  deep  learning  require
large  and  representative  training  datasets.  Insufficient  or
unrepresentative  training  data  can  lead  to  generated  pal-
ettes that are not suitable for practical applications.
- Algorithm  complexity  and  computational  resources.
Methods  based  on  artificial  neural  networks  and  deep
learning  require  significant  computational  resources  and
time. These methods often rely on high- performance com-
puters  or  GPUs  for  model  training.  Additionally,  these
methods  have  higher  algorithmic  complexity  and  longer
training times.
- Limitations in color f lexibility. Automated palette gen-
eration  methods  often  cannot  provide  the  same  level  of
flexibility  and  personalization  as  manual  methods.  These
methods typically generate a set of colors that meet certain
requirements but may struggle to adjust and optimize them
for specific scenarios.
- Color  perception  issues.  Automatically  generated  pal-
ettes may not fully meet the requirements of human visual
perception,  particularly  in  terms  of  contrast,  brightness,
and  saturation.  These  issues  can  result  in  generated  pal-
ettes  that  do  not  match  the  intended  application  or  lack
aesthetic appeal. Future research directions include more
accurate  and  robust  color  palette  extraction  algorithms,
deep  learning-  based  palette  extraction,  and  multi-  modal
palette extraction. Additionally, with the continuous devel-
opment of computer hardware and software technologies,
there  are  promising  prospects  for  color  palette  extraction
in real- time image processing and mobile applications.
Based  on  the  investigation  of  the  development  of  color  palette
generation  and  its  application,  we  believe  that  computer-  based
color palette generation methods are a rapidly evolving field, and
future trends may encompass the following aspects.
- Better datasets. Improved training datasets can enhance
the  performance  of  methods  based  on  statistics,  artificial
FIGURE 11       |    Some innovative methods for color palette generation in the AI era.
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 263
neural  networks,  and  deep  learning.  Increasing  the  scale
and quality of training datasets can lead to better algorithm
performance.
- More  efficient  algorithms.  As  computer  technology  ad-
vances,  future  algorithms  will  become  more  efficient  and
faster. Parallel computing and distributed computing can be
employed  to  accelerate  the  training  and  palette  generation
processes.
- Improved  color  perception.  Future  palette  generation
methods will pay more attention to color perception issues
and  human  visual  requirements.  Generated  palettes  will
better  align  with  practical  application  scenarios  and  aes-
thetic considerations.
- Personalization  and  f lexibility.  Future  palette  genera-
tion  methods  will  focus  on  personalization  and  flexibility,
allowing adjustments and optimizations based on different
application scenarios and user needs. This will result in pal-
ettes that better meet specific requirements.
The investigation has revealed the multidisciplinary nature of
color palette generation that blends art, psychology, technology,
and  practical  application.  The  push  towards  automation  and
user-  friendly  tools  reflects  a  democratization  of  color  design,
making  it  accessible  beyond  professional  designers.  However,
the challenge remains in balancing aesthetic appeal with func-
tionality, especially in specialized fields like medical imaging
or data encryption. Moreover, the progress of AI and machine
learning in recent achievements marks a significant leap in the
capability  to  generate  and  analyze  color  palettes  [4,  6,  7,  65],
offering  more  personalized  and  context-  aware  solutions.  This
evolution  reflects  the  ongoing  trend  of  integrating  advanced
computational methods into creative and analytical processes.
Overall,  the  research  on  color  palette  generation  is  highly
dynamic,  continuously  evolving  with  technological  advance-
ments and expanding its application across various domains.
## Author Contributions
Ya fa n Gao: conceptualization (equal), investigation, writing – original
draft preparation. Jinxing Liang: conceptualization (equal), conceive
the  structure  of  the  article,  supervision,  writing  –  review  and  editing.
Jie Ya ng: conceptualization (equal), conceived the structure of the arti-
cle, supervision, writing – review and editing.
Conflicts of Interest
The authors declare no conflicts of interest.
## Data Availability Statement
Data sharing not applicable to this article as no datasets were generated
or analysed during the current study.
## References
- W. Kandinsky, Concerning the Spiritual in Art (New York, US: Dover
## Publications, 2012).
- S. Hart and J. Murphy, The New Wealth Creators (New York, US: New
## York University Press, 1998).
-  Y.  Chen,  L.  Yu,  S.  Westland,  and  V.  Cheung,  “Investigation  of  De-
signers'  Colour  Selection  Process,”  Color  Research  and  Application  46
## (2021): 557–565.
-  D.  Cohen-  Or,  O.  Sorkine,  R.  Gal,  T.  Leyvand,  and  Y.  Q.  Xu,  “Color
Harmonization,” in ACM SIGGR APH 2006 Papers (New York, US: As-
sociation for Computing Machinery, 2006), 624–630.
- L. C. Ou, M. R. Luo, A. Woodcock, and A. Wright, “A Study of Colour
Emotion and Colour Preference. Part I: Colour Emotions for Single Co-
lours,” Color Research & Application 29, no. 3 (2004): 232–240.
- J. Cho, S. Yun, K. Mu Lee, and J. Y. Choi, “Palettenet: Image Recolor-
ization With Given Color Palette,” in Proceedings of the IEEE Conference
on  Computer  Vision  and  Pattern  Recognition  Workshops  (New  Jersey,
US: IEEE Xplore Digital Library, 2017), 62–70.
-    D. Xia Zixun and L. X. Zheng jun, “Representative Palette Extraction
and Image Recoloring,” Journal of Computer- Aided Design & Computer
Graphics 35, no. 5 (2023): 738–748.
-  S.  Yan,  S.  Xu,  W.  Yang,  and  S.  Zhang,  “Image  Recoloring  Based  on
Fast  and  Flexible  Palette  Extraction,”  Multimedia  Tools  and  Applica-
tions 1–18 (2023): 47793–47810.
-  S.  Shaikh,  N.  Akhter,  and  R.  Manza,  “Medical  Image  Processing  of
Thermal Images in Light of Applied Color Palettes.”
- M. Yu, H. Yao, C. Qin, and X. Zhang, “Reversible data hiding in pal-
ette images,” IEEE Transactions on Circuits Systems for Video Technol-
ogy 33 (2022): 6 4 8– 660.
-  M.  Frackiewicz,  H.  Palus,  and  D.  Prandzioch,  “Superpixel-  Based
PSO Algorithms for Color Image Quantization,” Sensors 23 (2023): 1108.
-  B.  H.  Park,  K.  Son,  and  K.  H.  Hyun,  “Interior  Design  Network  of
Furnishing and Color Pairing With Object Detection and Color Analy-
sis Based on Deep Learning,” in International Conference on Computer-
Aided  Architectural  Design  Futures  (California,  US:  Springer,  2021),
## 237–249.
- A. Han, J. Kim, and J. Ahn, “Color Trend Analysis Using Machine
Learning  With  Fashion  Collection  Images,”  Clothing  and  Textiles  Re-
search Journal 4 0 (2022): 308–32 4.
-  L.  Garrison  and  S.  Bruckner,  “Considering  Best  Practices  in  Color
Palettes  for  Molecular  Visualizations,”  Journal  of  Integrative  Bioinfor-
matics 19 (2022): 20220016.
- R. C. Gonzalez and R. E. Woods, Digital Image Processing (New Jer-
sey, US: Pearson Education, 2002).
- J. Patel and R. Anand, “Color Image Segmentation for Medical Im-
ages Using l*a*b* Color Space,” IOSR Journal of Electronics and Commu-
nication Engineering 1 (2012): 2 4 – 45.
- E. Chavolla, D. Zaldivar, E. Cuevas, and R. Rojas, “Color Spaces Ad-
vantages and Disadvantages in Image Color Clustering Segmentation,”
International  Journal  of  Advanced  Computer  Science  and  Applications
## 9 (2018): 1–10.
- L. Velho, A. C. Frery, and J. Gomes, Image Processing for Computer
Graphics and Vision (London, UK: Springer, 2009).
-  G.  Finlayson  and  R.  Xu,  “Illuminant  and  Gamma  Comprehensive
Normalisation in Logrgb Space,” Pattern Recognition Letters 24 (2003):
## 1679–1690.
-  E.  Blanco,  M.  Mazo,  L.  Bergasa,  and  S.  Palazuelos,  “A  Method  to
Increase Class Separation in the HS Plane for Color Segmentation Ap-
plications,” in 2007 IEEE International Symposium on Intelligent Signal
Processing (New Jersey, US: IEEE, 2007), 1–6.
## 21. T. Kuremoto, Y. Kinoshita, L. B. Feng, S. Watanabe, K. Kobayashi,
and M. Obayashi, “A Gesture Recognition System With Retina- v1 Model
and  One-  Pass  Dynamic  Programming,”  Neurocomputing  116  (2013):
## 291–300.
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 264
## Color Research & Application, 2025
-  H.  Yanga,  Y.  Wanga,  Q.  Wanga,  and  X.  Zhanga,  “Ls-  Svm  Based
Image  Segmentation  Using  Color  and  Texture  Information,”  Jour-
nal  of  Visual  Communication  and  Image  Representation  23  (2012):
## 1095–1112.
-  S.  Khaled,  M.  Saiful  Islam,  M.  G.  Rabbani,  et  al.,  “Combinatorial
Color Space Models for Skin Detection in Sub- Continental Human Im-
ages,”  in  Visual  Informatics:  Bridging  Research  and  Practice  (Berlin,
## Heidelberg: Springer, 2009), 532–542.
-  W.  Liu,  L.  Wang,  and  Z.  Yang,  “Application  of  Self-  Adapts  to  RGB
Threshold Value for Robot Soccer,” in 2010 International Conference on
Machine Learning and Cybernetics, vol. 2 (New Jersey, US: IEEE, 2010),
## 599–603.
- M. R. Luo and C. Li, “CIECAM02 and Its Recent Developments,” in
Advanced Color Image Processing and Analysis (New York, US: Springer,
## 2 013), 19 –58.
-  M.  Tokumaru,  N.  Muranaka,  and  S.  Imanishi,  “Color  Design  Sup-
port  System  Considering  Color  Harmony,”  in  Proceedings  of  the  2002
IEEE International Conference on Fuzzy Systems, vol. 1 (New Jersey, US:
## IEEE, 2002), 378–383.
- V. Oleg and J. Buchanan, “The Local k- Means Algorithm for Colour
Image  Quantization,”  in  Graphics  Interface  (Toronto,  Canada:  Cana-
dian Information Processing Society, 1995), 128.
-  P.  Scheunders,  “A  Comparison  of  Clustering  Algorithms  Applied
to  Color  Image  Quantization,”  Pattern  Recognition  Letters  18  (1997):
## 1379–1384.
- X. Wan and C. Kuo, “A New Approach to Image Retrieval With Hier-
archical Color Clustering,” IEEE Transactions on Circuits and Systems
for Video Technology 8 (1998): 628–643.
- N. Ponomarenko, F. Battisti, K. Egiazarian, J. Astola, and V. Lukin,
“Metrics  Performance  Comparison  for  Color  Image  Database,”  Fourth
International  Workshop  on  Video  Processing  and  Quality  Metrics  for
## Consumer Electronics 27 (2009): 1–6.
-  D.  Lowe,  “Distinctive  Image  Features  From  Scale-  Invariant  Key-
points,” International Journal of Computer Vision 60 (2004): 91–110.
-  G.  Pass,  R.  Zabih,  and  J.  Miller,  “Comparing  Images  Using  Color
Coherence  Vectors,”  in  Proceedings  of  the  Fourth  ACM  International
Conference  on  Multimedia  (New  York,  US:  Association  for  Computing
## Machinery, 1997), 65–73.
-  D.  Nister  and  H.  Stewenius,  “Scalable  Recognition  With  a  Vocab-
ulary  Tree,”  in  2006  IEEE  Computer  Society  Conference  on  Computer
Vision  and  Pattern  Recognition,  vol.  2  (New  Jersey,  US:  IEEE,  2006),
## 2161–2168.
-  M.  Melgosa,  A.  Trémeau,  and  G.  Cui,  “Colour  difference  evalua-
tion,” in Advanced Color Image Processing and Analysis (New York, US:
## Springer, 2013), 59–79.
-  K.  Witt,  “CIE  Guidelines  for  Coordinated  Future  Work  on  Indus-
trial Colour- Difference Evaluation,” Color Research and Application 20
## (1995): 399–403.
-  G.  Cui,  M.  Luo,  B.  Rigg,  and  W.  Li,  “Colour-  Difference  Evaluation
Using CRT Colours. Part I: Data Gathering and Testing Colour Differ-
ence Formulae,” Color Research and Application 26 (2001): 394–402.
-  M.  Luo,  G.  Cui,  and  B.  Rigg,  “The  Development  of  the  CIE  2000
Colour- Difference Formula: CIEDE2000,” Color Research and Applica-
tion 26 (2001): 340–350.
-  Q.  Pan  and  S.  Westland,  “Comparative  Evaluation  of  Color  Differ-
ences Between Color Palettes,” in Proceedings of the IS&T Color and Im-
aging Conference (Virginia, US: Springfield, 2018), 110–115.
- J. Yang, Y. Chen, S. Westland, and K. Xiao, “Predicting Visual Sim-
ilarity  Between  Colour  Palettes,”  Color  Research  and  Application  45
## (2020): 1129–1140.
- S. Westland, G. Finlayson, P. Lai, et al., “A Computational Method
for  Predicting  Color  Palette  Discriminability,”  Color  Research  and  Ap-
plication 49 (2024): 1–9.
- J.  Albers, Interaction  of  Color  (Connecticut,  US:  Yale  University
## Press, 1975).
-  L.  Eiseman  and  K.  Recker,  Pantone  Guide  to  Communicating  With
Color (New York, US: Grafix Press, 2000).
- A. Morioka, S. Adams, and T. Stone, Color Design Workbook: A Real-
World Guide to Using Color in Graphic Design (New York, US: Rockport
## Publishers, 2006).
-  J.  Delon,  A.  Desolneux,  J.  Lisani,  and  A.  Petro,  “Automatic  Color
Palette,”  in  IEEE  International  Conference  on  Image  Processing,  2005.
ICIP 2005, vol. 2 (New Jersey, US: IEEE, 2005), 706–709.
-  J.  Delon,  A.  Desolneux,  J.  Lisani,  and  A.  Petro,  “Automatic  Color
Palette,” Inverse Problems and Imaging 1 (2007): 265–287.
-  B.  Morse,  D.  Thornton,  Q.  Xia,  and  J.  Uibel,  “Image-  Based  Color
Schemes,” in IEEE International Conference on Image Processing, 2007.
ICIP 2007, vol. 3 (New Jersey, US: IEEE, 2007), 497–500.
-  J.  MacQueen,  “Some  Methods  for  Classification  and  Analysis  of
Multivariate Observations,” in Proceedings of the Fifth Berkeley Sympo-
sium on Mathematical Statistics and Probability, vol. 1 (California, US:
University of California Press, 1967), 281–297.
- W. Barbakh, W. Ying, and F. Colin, Non- standard Parameter Adap-
tation for Exploratory Data Analysis (Scotland: University of the West of
## Scotland, 2009).
## 49. J. Bezdek, Pattern Recognition With Fuzzy Objective Function Algo-
rithms (Massachusetts, US: Kluwer Academic, 1981).
- J. Bezdek, L. Hall, and L. Clarke, “Review of MR Image Segmenta-
tion Techniques Using Pattern Recognition,” Medical Physics 20 (1993):
## 1033–1048.
-  M.  Ahmed,  S.  Yamany,  N.  Mohamed,  A.  Farag,  and  T.  Moriarty,
“A  Modified  Fuzzy  c-  Means  Algorithm  for  Bias  Field  Estimation  and
Segmentation of MRI Data,” IEEE Transactions on Medical Imaging 21
## (20 02): 193 –199.
-  L.  Szilagyi,  Z.  Benyo,  S.  Szilagyi,  and  H.  Adam,  “MR  Brain  Image
Segmentation Using an Enhanced Fuzzy c- Means Algorithm,” in 2003
25th Annual International Conference of the IEEE Engineering in Medi-
cine and Biology Society (IEEE Cat. No. 03CH37439), vol. 3 (New York,
## US: IEEE, 2003), 724–726.
-  S.  Chen  and  D.  Zhang,  “Robust  Image  Segmentation  Using  Fcm
With Spatial Constraints Based on New Kernel- Induced Distance Mea-
sure,” IEEE Transactions on Systems, Man, Cybernetics, Part B (Cyber-
net ics) 34 (2004): 1907–1916.
- F. Zhao, “Fuzzy Clustering Algorithms With Self- Tuning Non- local
Spatial  Information  for  Image  Segmentation,”  Neurocomputing  106
## (2013): 115–125.
-  S.  Krinidis  and  V.  Chatzis,  “A  Robust  Fuzzy  Local  Information  c-
Means Clustering Algorithm,” IEEE Transactions on Image Processing
## 19 (2010): 1328–1337.
- M. Gong, Z. Zhou, and J. Ma, “Change Detection in Synthetic Aper-
ture Radar Images Based on Image Fusion and Fuzzy Clustering,” IEEE
Transactions on Image Processing 21 (2012): 2141–2151.
-  D.  Du  and  C.  Wu,  “Research  on  Kernel  Space  Intuitionistic  Fuzzy
Local  c-  Means  Clustering  Algorithm,”  International  Journal  of  Com-
puter Engineering and Applications 52 (2 016): 171–178.
- M. Ghorbani, “Maximum Entropy- Based Fuzzy Clustering by Using
LT- Noitu  Space,” Turkish Journal of Mathematics 29 (2014): 431–438.
-  Y.  Liu,  H.  Wang,  J.  Liu,  et  al.,  “Feature  Weighted  Fuzzy  c-  Ordered
Means Clustering Algorithm,” Journal of Henan Polytechnic University
(Natural Science) 38 (2019): 123–130.
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

## 265
-  S.  Kohonen,  “Self-  Organized  Formation  of  Topologically  Correct
## Feature Maps,” Biological Cybernetics 43 (1982): 59–69.
- S. Ong, N. Yeo, and K. Lee, “Segmentation of Color Images Using a
Two- Stage  Self- Organizing  Network,” Image and Vision Computing 20
## (20 02): 279 –289.
- C. Chang, P. Xu, R. Xiao, et al., “New Adaptive Color Quantization
Method Based on Self- Organizing Maps,” IEEE Transactions on Neural
## Networks 16 (2005): 237–249.
-  N.  Yeo,  K.  Lee,  Y.  Venkatesh,  et  al.,  “Colour  Image  Segmentation
Using  the  Self-  Organizing  Map  and  Adaptive  Resonance  Theory,”
Image and Vision Computing 23 (2005): 1060 –1079.
-   C.   Wang,   C.   Lee,   and   C.   Hsieh,   “Sample-   Size   Adaptive   Self-
Organization  Map  for  Color  Image  Quantization,”  Pattern  Recognition
## Letters 28 (2007): 1616 –1629.
-  G.  Mathur  and  H.  Purohit,  “Performance  Analysis  of  Color  Image
Segmentation  Using  k-  Means  Clustering  Algorithm  in  Different  Color
Spaces,” International  Journal  of  Computer  Engineering  and  Applica-
tions 52 (2 014): 171–178.
- Y. Hu, M. Lee, and P. Tsai, “Colour Palette Generation Schemes for
## Colour Image Quantization,” Imaging Science Journal 57 (2009): 28–37.
-  F.  Shmmala  and  W.  Ashour,  “Color  Based  Image  Segmentation
Using Different Versions of k- Means in Two Spaces,” International Jour-
nal of Computer Engineering and Applications 52 (2 013): 171–178.
-  S.  Arumugadevi  and  V.  Seenivasagam,  “Comparison  of  Clustering
Methods for Segmenting Color Images,” Indian Journal of Science and
## Technology 8 (2015): 670.
-  S.  Liu,  M.  Tao,  Y.  Huang,  et  al.,  “Image-  Driven  Harmonious  Color
Palette Generation for Diverse Information Visualization,” IEEE Trans-
actions on Visualization Computers and Graphics 28 (2022): 1–11.
-  W.  Leow  and  R.  Li,  “The  Analysis  and  Applications  of  Adaptive-
Binning Color Histograms,” Computer Vision and Image Understanding
## 94 (2004): 67–91.
- A. Ahmad and L. Dey, “A k- Mean Clustering Algorithm for Mixed
Numeric  and  Categorical  Data,”  Data  &  Knowledge  Engineering  63
## (2 0 0 7): 5 03 –527.
- S. Kim and S. Kang, “Gan- Based Color Palette Extraction System by
Chroma Fine- Tuning With Reinforcement Learning,” Journal of Semi-
conductors 2 (2021): 125–129.
-  J.  Cho,  S.  Yun,  K.  Lee,  and  J.  Choi,  “Palettenet:  Image  Recoloriza-
tion  With  Given  Color  Palette,”  in  Proceedings  of  the  IEEE  Conference
on Computer Vision and Pattern Recognition Workshops (New York, US:
## IEEE, 2017), 1058–1066.
-  W.  Cho,  H.  Bahng,  D.  K.  Park,  et  al.,  “Text2colors:  Guiding  Image
Colorization  Through  Text-  Driven  Palette  Generation,”  arXiv   1812
## (2 018): 1–12 .
-  A.  Moussa  and  H.  Watanabe,  “Generation  and  Extraction  of  Color
Palettes With Adversarial Variational Auto- Encoders,” in Proceedings of
Sixth International Congress on Information and Communication Tech-
nology (New York, US: Springer, 2022), 889–897.
- Y. Alami Mejjati, C. Richardt, J. Tompkin, D. Cosker, and K. I. Kim,
“Unsupervised   Attention- Guided   Image- To- Image   Translation,” Ad-
vances in Neural Information Processing Systems 31 (2018): 1–11.
- J. Devlin, M. Chang, K. Lee, and K. Toutanova, “Bert: Pre- Training
of  Deep  Bidirectional  Transformers  for  Language  Understanding,”  in
Proceedings of the 2019 Conference of the North American Chapter of the
Association for Computational Linguistics: Human Language Technolo-
gies  (New  York,  US:  Association  for  Computational  Linguistics,  2019),
## 4171– 4186.
- Y. Liu, “Roberta: A Robustly Optimized Bert Pretraining Approach,”
arXiv 33 (2019): 1877–1901.
-  C.  Raffel,  N.  Shazeer,  A.  Roberts,  et  al.,  “Exploring  the  Limits  of
Transfer  Learning  With  a  Unified  Text-  To-  Text  Transformer,”  Journal
of Machine Learning Research 21 (2020): 1–67.
-  P.  He,  X.  Liu,  J.  Gao,  and  W.  Chen,  “Deberta:  Decoding-  Enhanced
Bert  With  Disentangled  Attention,”  in  International  Conference  on
Learning  Representations  (Addis  Ababa,  Ethiopia:  International  Con-
ference on Learning Representations, 2021).
- A. Radford, J. Wu, R. Child, D. Luan, D. Amodei, and I. Sutskever,
“Language  Models  Are  Unsupervised  Multitask  Learners,”  OpenAI
## Blog 1 (2019): 9.
-  T.  Brown,  B.  Mann,  N.  Ryder,  et  al.,  “Language  Models  Are  Few-
Shot Learners,” in Advances in Neural Information Processing Systems,
vol. 33 (New York, US: Neural Information Processing Systems Founda-
tion, 2020), 1877–1901.
- OpenAI, “Chatgpt” (2022), https:// openai. com/ blog/ chatg pt/ .
-  OpenAI,  “Gpt-  4  Technical  Report”  (2023),  https:// ar xiv. org/ abs/
## 2303. 08774 .
- Y. Li, Y. Zhang, J. Wang, Y. Wang, and J. Zhang, “Culture- Inspired
Multi-  Modal  Color  Palette  Generation  and  Colorization:  A  Chinese
Youth Subculture Case,” in 2021 IEEE 4th International Conference on
Multimedia  Information  Processing  and  Retrieval  (MIPR)  (New  Jersey,
## US: IEEE, 2021), 382–385.
-  Q.  Qiu,  X.  Wang,  and  M.  Otani,  “Multimodal  Color  Recommenda-
tion in Vector Graphic Documents,” in Proceedings of the 31st ACM In-
ternational Conference on Multimedia (New York, US: ACM, 2023).
15206378, 2025, 3, Downloaded from https://onlinelibrary.wiley.com/doi/10.1002/col.22975 by Nat Prov Indonesia, Wiley Online Library on [05/05/2026]. See the Terms and Conditions (https://onlinelibrary.wiley.com/terms-and-conditions) on Wiley Online Library for rules of use; OA articles are governed by the applicable Creative Commons License

---
> **METADATA (NEXUS SEMANTIC TAGS)**: [security, database, ui-ux, performance, tdd, vcs, api]
