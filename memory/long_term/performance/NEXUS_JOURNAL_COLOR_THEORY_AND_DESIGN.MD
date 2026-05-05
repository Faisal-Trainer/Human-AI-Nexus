> **METADATA (NEXUS SEMANTIC TAGS)**: [design, color-theory, psychology, ux, academic-research]



## Overview
Color theory and design
## Edward Wegman
## ∗
and Yasmin Said
In this article, we discuss color theory and design with emphasis on use in
statistical, scientific, and data visualization. Color theory is inextricably linked
to the physiology of the human visual system, and color design is similarly
inextricably linked to human perception. We discuss color perception in the
human visual system. We then quantify color perception in terms of the Munsell
System and the International Commission on Illumination (CIE) color space. We
continue to discuss color design with a perspective on individuals with defective
color perception and finally conclude with a discussion of color design for the use
of color in presentations.
2011 John Wiley & Sons, Inc.WIREs Comp Stat2011 3 104–118 DOI:
## 10.1002/wics.146
## HUMAN VISUAL SYSTEM
## T
he perception of color has at least two major
components.  On  the  one  hand,  color  can
be discussed simply as a phenomenon of certain
wavelengths of electromagnetic radiation. On the
other hand, most electromagnetic radiation cannot be
perceived by human beings. It is the very narrow band
of electromagnetic radiation that can be perceived
by humans that we call light and which leads to an
incredible sensory experience that we call vision. It is
this marvelous confluence of, in some sense, absolute
wavelengths of electromagnetic radiation and psycho-
physical decoding of these wavelengths in the human
visual system that gives rise to the perception of color.
Human vision relies on light sensitive cells in the
retina of the eye. There are two basic kinds of sensors.
These are rods and cones. Rods are cells which can
work at very low light intensity (scotopic), but cannot
resolve sharp images or color. The rods contain a
pigment,rhodopsin, also calledvisual purple, which
saturates at higher levels of light. Cones are cells
that can resolve sharp images and color, but require
much higher light levels to work. Figure 1 illustrates
the major components of the human eye. Both the
rod cells and the cone cells are located on the retina.
The central part of the retina is called thefovea,
which is where cells responsible for vision are most
densely located. There are about 10
## 7
foveal cones.
The combined information from these sensors is sent
to the brain and enables human vision.
## ∗
Correspondence to: ewegman@gmail.com
Center for Computational Data Sciences, George Mason University,
Fairfax, VA, USA
DOI: 10.1002/wics.146
There are three types of cones. A somewhat
simplistic interpretation is that red cones are sensitive
to red light, green cones are sensitive to green light, and
blue cones are sensitive to blue light. More precisely,
the cones are sensitive to long, medium, and short
wavelengths of light. The peak response of the cones
do not actually occur precisely in the red, green,
and blue color bands, but the perception of color
depends on contrast among the stimulation levels of
the different cell types.
With the simplification of red, green, and blue
cones in mind, when red light hits the eye, the cones
sensitive to red are excited, causing a particular
sensation in the brain. That is what we call ‘red.’
This is what physically happens when we observe, say
a tomato in neutral daylight: the sunlight, composed
of electromagnetic waves with wavelengths from 380
to 780 nm, shines on the tomato. The tomato absorbs
the light from 380 to 580 nm and reflects the light
from 580 to 780 nm. This light reaches the eyes,
where it excites the cones that have their sensitivity
centered on 570 nm. The signals from these cones are
finally processed by our brain. We are taught that this
particular sensation is called ‘red.’
The relationship between wavelength and actual
hue is roughly:
•620–730 nm: red
•590–610 nm: orange
•550–580 nm: yellow
•490–540 nm: green
•450–480 nm: blue
•380–440 nm: violet.
1042011 John Wiley & Sons, Inc.Volume 3, March/April 2011

WIREs Computational StatisticsColor theory and design
## Pupil
## Iris
Posterior chamber
## Zonular
fibres
## Retina
## Choroid
## Sclera
Optic disc
Optic nerve
## Fovea
## Retinal
blood vessels
## Cornea
Anterior chamber
(aqueous humour)
Ciliary muscle
## Suspensory
ligament
## Hyaloid
canal
## Vitreous
humour
## Lens
FIGURE 1|Schematic diagram of the human eye. This image is used under the Creative Commons Attribution-Share Alike 3.0 License. Details are
at http://creativecommons.org/licenses/by-sa/3.0/legalcode.
The colors we see are affected by the intensity
of light and by its spectral content. At low levels of
illumination, objects are less colorful because rods
are dominant. In bright daylight, we see more color,
contrast, and saturation because cones dominate.
Figures 2 and 3 illustrate these effects.
## COLOR THEORY
Based on the notion that all color perception in
humans can be reconstructed using the three so-called
primary colors, red, green, and blue, a theory of color
perception can be developed. It should be noted that
other animals may have more or less color perception
or no color perception at all. Indeed, the pigments in
the eyes can vary from one animal group to another
and can be used to tell theevolutionary distance
between animal groups.
## 1
Thus color theory based on
red, green, and blue applies to human color perception
and not necessarily to any other animal groups.
Additive color processes, such as television,
work by having the capability to generate an image
composed of red, green, and blue light. Because the
intensity information for each of the three colors is
preserved, the image color is preserved as well. The
spectral distribution of the image will probably be
wrong, but if the degree of intensity for each of the
primary colors is correct, the image will appear to be
the right color. Red, green, and blue are the additive
primary colors because they correspond to the red,
green, and blue cones in the eye.
Subtractive color processes work by blocking out
parts of the spectrum. The idea of subtractive color
is to reduce the amount of undesired color reaching
the eye. If, for example, one had a yellow image, one
would want to have a dye that would let red and
green reach the eye, and block out blue. The additive
secondaries become the subtractive primaries, because
each of the additive secondaries will reflect two of the
additive primaries, and absorb one of the additive
primaries (Figures 4 and 5). See also Table 1.
With this information, in a subtractive color
system, such as printed documents that reflect light,
if we wanted red, we would mix magenta and yel-
low. Magenta would absorb green, and yellow would
Volume 3, March/April 20112011 John Wiley & Sons, Inc.105

## Overview
www.wiley.com/wires/compstats
FIGURE 2|Image at low level of illumination so that it is less colorful. Rods would dominate. Photo by Yasmin Said.
FIGURE 3|Image at high level of illumination in open air market. Cones would dominate. Photo by Edward Wegman.
absorb blue, leaving only red to be reflected back
to the eye. For black, a combination of all three
would be used, which should, in principle, block
out all light. In practice, printers use black as well,
because the dyes used in printing are not perfect, and
some light from other parts of the spectrum still is
reflected.
A useful observation in an additive color system
is that because magenta is made of red and blue in
equal intensities, that mixing magenta and green is,
1062011 John Wiley & Sons, Inc.Volume 3, March/April 2011

WIREs Computational StatisticsColor theory and design
TABLE 1Additive Secondaries/Subtractive Primaries Absorption
## Chart
ColorReflectsAbsorbs
YellowRed and greenBlue
MagentaRed and blueGreen
CyanGreen and blueRed
FIGURE 4|Additive secondaries are derived by combining primary
colors.
FIGURE 5|Subtractive primaries mixing chart.
in effect mixing red, blue, and green, which should
give us pure white. Thus in an additive color system,
magenta and green are complementary colors. In the
same way, red and cyan are complementary colors and
yellow and blue are complementary colors. Figure 6,
which is a somewhat doctored black and white
photograph of the late Professor Sam Wilks illustrates
the complementary nature of these color pairs. One
can take advantage of these complementary pairs in
data visualization as well as anaglyph stereo. In the
data visualization context, if one has two clusters, it
is useful to brush one with, say, red and the other
with, say, cyan. These colors together make white, so
where the clusters overlap, the mixing of colors will
yield white. Plotted against a black background, it
becomes evident where the clusters overlap. Similarly
FIGURE 6|Professor Sam Wilks illustrating additive
complementary colors. This photo is used with permission of the Army
Conference on Applied Statistics. Professor Wilks proposed the Army
Design of Experiments Conference. The first such conference was held
in October 1955 and was chaired by Professor Wilks.
with anaglyph stereoscopic displays, it is useful to
make one eye peer through a red filter and the other
through a cyan filter. Thus the overall impression
is a white background. Often, the anaglyph glasses
are red and green giving a background color of
yellow, or red and blue, giving a background color of
magenta.
Color can be defined by three properties:hue,
saturation,andlightnessorbrightness.Whenwe
call an object ‘red,’ we are referring to its hue.
Hue is determined by the dominant wavelength. The
saturation of a color rangesfrom neutral to brilliant.
Colors are desaturated by mixing in white or gray or
black. Lightness or brightness refers to the amount of
light the color reflects or transmits.
## The Munsell System
Color ordering systems, such as the Munsell System,
use the three properties of color to identify unique
colors. Notice that colors are distributed in three
dimensions:hue,chroma(saturation), andvalue
(lightness). We commonly see colors arrayed in
two dimensions. This is a useful, but incomplete
representation. Value is the third dimension that
is not shown in two-dimensional color wheels, but
is often used in image editing software. Professor
Albert Munsell’s (1885–1918) description of the
color system was published in Refs 2,3. Munsell’s
system was based on rigorous experimental research
with careful measurements of human visual responses
Volume 3, March/April 20112011 John Wiley & Sons, Inc.107

## Overview
www.wiley.com/wires/compstats
FIGURE 7|Illustration of the Munsell color system. The vertical direction represents value or lightness. The radial direction represents Chroma or
Saturation. The angular direction represents Hue. This image is used under the Creative Commons Attribution-Share Alike 3.0 License. Details are at
http://creativecommons.org/licenses/by-sa/3.0/legalcode.
to color (Figure 7). It persisted for many decades,
eventually being superseded by systems such as
the CIE (in French, Commission Internationale de
l’Eclairage).
CIE Models
If  the  Munsell  system  established  the  three-
dimensional nature of color perception, the CIE
models attempt to establish numerical values.
## 4,5
## To
measure and predict the appearance of a particular
color, we need a way to link perception to numbers
and formulas. Scientific color values were established
earlier this century by the CIE group. CIE models
for defining color space all rely on the same basic
numbers. There are basically two variants of the CIE
color space known respectively asCIE XYZandCIE
xyY. As mentioned earlier, the cones within a human
eye have stimulus response to different wavelengths,
long, medium, and short wavelengths. These, we
mentioned, are frequently designated as Red, Green,
and Blue although the peak sensitivity of each type
of cell does not correspond exactly to these colors.
These are designated in the CIE system as CIEXYZ
(Figure 8). The ability of the human eye to respond
to three different wavelengths is calledtristimulus.It
is, of course, possible for two sources of light with
distinctly different spectral distributions to combine to
present a tristimulus value to the eye and be recorded
as a certain color. It is possible for another two
sources of light with different spectral distributions
from the first two to combine and present the same
## 2.0
## 1.5
## 1.0
## 0.5
## 0.0
## 400
## 500600
x(l)
l/nm
## 700
y(l)
z(l)
FIGURE 8|XYZ Color matching functions as described in the text.
## 4
This image is used under the Creative Commons Attribution-Share Alike
3.0 License. Details are at http://creativecommons.org/licenses/by-sa/
## 3.0/legalcode.
tristimulus value to the eye, which would therefore be
recorded as the same color even though the combined
spectrums are distinctly different. This effect is called
metamerism.
Because of the distribution of cone cells on the
retina, color perception depends on the field of view
with each individual having different distribution and
different field of view. The CIE sought to eliminate
this variability be defining astandard colorimetric
observer. With the belief that most cones are located
within 2
## ◦
of the fovea, the chromatic response of
the standard colorimetric observer was taken to
be the response of the average human within 2
## ◦
## .
Based on extensive experimentation,
## 6,7
the standard
1082011 John Wiley & Sons, Inc.Volume 3, March/April 2011

WIREs Computational StatisticsColor theory and design
colorimetric observer is characterized bythree color
matching functions. The color matching functions are
a numerical description of the chromatic response
of the standard colorimetric observer, which is, of
course, the average chromatic response of a number of
humans. The CIE defines the color matching functions
as
x(λ),y(λ), andz(λ) whereλis the wavelength in
nanometers.
The tristimulus valuesX,Y,andZfor a color
with spectral power distributionf(λ) are given in terms
of the standard colormetric observer as
## X=
## ∫
## ∞
## 0
f(λ)
x(λ)dλ
## Y=
## ∫
## ∞
## 0
f(λ)
y(λ)dλ
## Z=
## ∫
## ∞
## 0
f(λ)
z(λ)dλ.
The CIExyYcolor space is a derived color
space. TheYvalue was designed to reflect the overall
luminance (brightness, lightness). The remaining two
dimensions are characterized by thexandyand are
used to specify colors. Here the normalized values are
given by
x=
## X
## X+Y+Z
y=
## Y
## X+Y+Z
z=
## Z
## X+Y+Z
## .
The valuesxandyspecify the chromaticity
diagram, independent of luminance. This diagram is
illustrated in Figure 9.
In the CIEXYZcolor space, the saturation
(chroma in Munsell, purity in CIE) is the Euclidean
## 0.9
## 0.8
## 0.7
## 0.6
## 500
## 520
## 540
## 560
## 580
## 600
## 620
## 700
## 490
## 480
## 470
## 460
## 380
## 0.5
## 0.4
y
## 0.3
## 0.2
## 0.1
## 0.0
## 0.0
## 0.10.20.3
## 0.4
x
## 0.5
## 0.60.7
## 0.
## 8
FIGURE 9|CIE xyY Chromaticity Diagram as a function ofxandy. The range 380 to 700 nm represents the range of perception of visible light
for humans. Saturation as well as chroma are represented in this diagram. This image is used under the Creative Commons Attribution-Share Alike
3.0 License. Details are at http://creativecommons.org/licenses/by-sa/3.0/legalcode.
Volume 3, March/April 20112011 John Wiley & Sons, Inc.109

## Overview
www.wiley.com/wires/compstats
distance between the position of one color (x,y)and
the illuminant’s reference white (x
w
## ,y
w
), i.e. that set of
three chromaticity values that determines the reference
white in thexyplane divided by the same distance for
a pure (monochromatic) color with the same hue
## (x
c
## ,y
c
## )=ρ
max
## (x−x
w
## ,y−y
w
## )+(x
w
## ,y
w
) whereρ
max
is the maximum in the chromaticity diagram. Then
purity is defined as
p=
## √
## (x−x
w
## )
## 2
## +(y−y
w
## )
## 2
## √
## (x−x
c
## )
## 2
## +(y−y
c
## )
## 2
## .
In an RGB space, saturation can be thought of
as the standard deviation,σ, of the color coordinates
R(red),G(green), andB(blue). Lettingμbe the
luminance, then
σ=
## √
(R−μ)
## 2
+(G−μ)
## 2
+(B−μ)
## 2
## 3
## .
While Figure 9 represents the experimentally
derived range of colors that a human being can
see, mechanical reproduction of these colors typically
occupy a much smaller range of available colors.
This range of colors that are reproducible by a
given technology is called thegamut. Measuring color
allows us to compare the color gamut, or range of
colors produced by different methods (Ref 8, Section
18.7). Color transparency film produces a wide range
of colors including some a monitor cannot display.
Color printers and printing presses have different
color gamuts. Roughly speaking in the order of
decreasing gamut range the technologies are: color
transparency film, color monitors and HDTV systems,
NTSC systems, color printers, and printing presses.
These systems can never capture all the colors that the
eye can see, but they can simulate the appearance very
successfully if color reproduction is understood and
controlled.
Another  important  characteristic  of  each
component in the color production system is its
gamma(γ). It is a number that indicates the
relationship between the signal values at input and
output of a particular device. Aγof 1 indicates a
linear behavior. This means that the device’s output is
directly proportional to its input. A color display may
have a nonlinear color behavior. If the video signal
at the input contains a value of 60% of full-scale
red, the image on the screen may be only 30% of
full-scale red (thus dark-red). This is why a scanned
image normally looks darker when it is shown on a
display. This behavior can be graphically displayed in
aγcurve (Figures 10 and 11).
γ
correction
## 1/2.2
## CRT
γ  2.2
## 0.5
## 0.5
## 0.218
## 0.218
## 0
## 0
## 0.1
## 0.2
## 0.3
## 0.4
## 0.5
## 0.6
## 0.7
## 0.8
## 0.9
## 1
## 0.10.20.30.40.50.60.70.80.91
FIGURE 10|Atypicalγcurve for a CRT. In order to correct for the
nonlinearity in the display device, a complementaryγcorrection curve
must be introduced. Note that near one and near zero theγcurve is
close to the idea linear response. This means respectively whites are
white and blacks are black. This image is used under the Creative
Commons Attribution-Share Alike 3.0 License. Details are at
http://creativecommons.org/licenses/by-sa/3.0/legalcode.
To summarize the color concepts:
•Hue: color with no black, white or gray added
•Tint: hue+white
•Shade: hue+black
•Tone: hue+gray or hue+varying degrees of its
complementary color
•ValueorLightnessorBrightnessorLuminosity:
how light or dark a color appears
•IntensityorPurity: how bright or dull a
color appears, also called saturation and/or
chromaticity. Basically, how much of the hue
is identifiable. Grays are achromatic, meaning
no hue/color.
## Digital Colors
Although the CIE and Munsell color systems assume a
continuous range of colors, in fact, when reproduced
digitally, there are only a finite number of distinct
colors available. Many of us from childhood would
be familiar with the idea of a finite number of colors.
Crayola crayons for beginners came in a box with 8
colors (2
## 3
). More advanced color choices could be had
in boxes of 16 colors (2
## 4
), or 32 colors (2
## 5
), or even 64
colors (2
## 6
). The Crayola website
## 9
gives an interesting
1102011 John Wiley & Sons, Inc.Volume 3, March/April 2011

WIREs Computational StatisticsColor theory and design
## (a)(b)(c)
FIGURE 11|Illustration of the effect ofγadjustments. Notice that the whites remain white (T-shirt) and the blacks remain black (shadow). The
middle image was what came from the digital camera. The left image is withγadjusted down, the right withγadjusted up. This illustration is
courtesy of Edward Wegman.
chronology of the development of the Crayola colors,
including some interesting name changes reflecting
political correctness. For example, Prussian blue was
changed to midnight blue, flesh was changed to peach,
and Indian red was renamed chestnut. There are
currently 120 Crayola colors available close to the
next power of 2, 2
## 7
## =128.
Typically, digital colors are represented at the
hinted-at powers of 2. Depending on the application,
the color resolution can range from 2
## 8
to 2
## 64
.The
GIF image file format uses 2
## 8
, i.e. 8 bit color or
256 distinct colors. This is far from the range of
colors the human eye can distinguish, so it is poor
at representation of continuous tone images. The
GIF file format compresses images in color space
so that all colors are mapped into only one of the
256 colors available. The usual recommendation is
to use GIF file format only if the image has a small
range of colors, e.g., in line drawings. The JPG (or
JPEG) file format has a 24 bit color space, i.e.,
## 2
## 24
=16,777,216. This amounts to 8 bits for each
of red, green, and blue. JPG files are compressed
spatially rather than in color space. Thus neighboring
pixels may be somewhat averaged. However, because
JPG is normally used for continuous tone images
such as photographs, this spatial compression is not
usually noticed. It is however detectable when JPG
compression is used for line drawings. TIFF format
files also employ 24 bit color and need not have any
compression. Thus, if space is not of consideration,
TIFF files are preferred. More recently, another image
file format has emerged, the PNG format. This was
created when the developers, Unisys, of the GIF format
decided to enforce the patent on LZW compression
on which the GIF file format is based. PNG format
also is capable of millions of colors. The human
eye is generally thought to be unable to distinguish
## 2
## 24
distinct colors, so that for purposes of rendering
images for human perception, 24 bit color is more
than adequate. For scientific purposes, however, a
higher color resolution is desirable. The HDF file
format is used for the earth observing system (EOS),
which has the capability of 2
## 64
, or 64 bit color. Most
computer-based color schemes use a 24 bit color scale,
8 bits in each of red, green, and blue, or equivalently
256 levels for each of the colors. Thus (0,0,0) would
represent black, (255,255,255) would represent white,
(255,0,0) would represent pure red, etc. Color in a
webpage can be specified by specifying the intensity of
each of the RGB components. This is typically done in
hexadecimal notation, where 0 ,..., 9 represent those
numbers and A, B, C, D, E, F represent the numbers
10, 11, 12, 13, 14, 15, respectively. Thus the code FF
in hexadecimal is 255 in decimal notation. Thus the
code for pure white in HTML would be %FFFFFF.
## COLOR DEFICIENCIES IN HUMAN
## VISION
Deficiencies in human color vision can result from
a number of causes. Perhaps the most frequent
deficiency is caused by changes due to aging of
the individual. Other deficiencies can result from
defective performance of certain types of cones even if
all three are present, missing types of cones, from
altogether missing cones, or from trauma to the
brain. Most of color theory is based on the notion
of tristimulus meaning that there are three types of
cones in the human eye, which have photopigment
receptors that are sensitive to light in different
wavelength ranges. Individuals with all three cone
type are called trichromats. There is some indication
Volume 3, March/April 20112011 John Wiley & Sons, Inc.111

## Overview
www.wiley.com/wires/compstats
that some individuals may have a fourth type of
photopigment so that they, indeed, might have four
different types of cones and hence have an even richer
color experience.
## 10
## The Elderly
Because the general population is aging, the majority
of difficulties with color perception is among the
elderly. One of us defines elderly as elderly = max(65,
age of EJW+10). The 2000 census indicated that
12.4% of the US population was over 65 years old,
and estimates by Hayutin
## 11
from the Stanford Center
on Longevity indicate that by 2030 some 22% of
the US population will be over 65. Indeed more than
20% of residents of most developed economies will
be older than 65. Deficiency of vision in the elderly
is a result of yellowing and darkening of the lens and
the shrinking of pupil size. Yellowing of the lens has
the result of blocking short wavelength (blue) light so
that the intensity of bluish colors is diminished. Of
course, colors that have a blue component will shift in
the perception of the elderly so that cyan, blue-gray,
light blue, magenta will be affected and more difficult
to distinguish. Because of the shrinking of the pupil
size, less light will reach the photoreceptors in the eye
so that colors generally appear darker that they would
for younger individuals with similar illumination.
For example, yellows may appear brown and blues
may appear black. Of course, when considering color
design for the elderly, these effects must be considered.
More saturated primary colors are thus recommended.
## Color Blindness
There are three basic types of color impaired vision,
what might be called color blindness. People with
normal color vision, as mentioned before, are called
trichromats. One less severe form of color impaired
vision occurs when there is an overabundance or
marked deficiency in cone cells with one of the three
photopigments or when one of the photopigments
responds to an unusual wavelength. The individuals
are calledanomalous trichromats. Basically, anoma-
lous trichromats can match color in the complete
range of hues, but require extra stimulation of cer-
tain primaries. They are not technically color blind,
but, in general, have difficulty in distinguishing cer-
tain colors that a normal trichromat would easily
distinguish. Depending on which primary requires
extra stimulus, anomalous trichromats fall into one of
three categories:protoanomalous,deuteranomalous,
ortritananomalous. The proportions of the anoma-
lous trichromats are outlined in Table 2.
TABLE 2Types and Percentages of Anomalous Trichromats.
(Reprinted with permission from Ref 12. Copyright 2004)
TypeCone% Male% Female
ProtoanomalousRed1.0.02
DeuteranomalousGreen4.9.38
TritananomalousBlue∼0∼0
TABLE 3Types and Percentages of Dichromats. (Reprinted with
permission from Ref 12. Copyright 2004)
TypeCone%Male%Female
ProtanopeRed1.00.02
DeuteranopeGreen1.10.01
TritanopeBlue0.0020.002
While anomalous trichromats have color vision,
and so are not technically color blind, there is a
definite impairment of color vision. Truly color blind
individuals have either one, two or three deficient
photopigments, i.e. they have only two types of cones,
dichromats, one or no type of cones,monochromats.
The encoding of the protein necessary for color
recognition resides on the X chromosome. Because
males have only one X chromosome, whereas females
have two X chromosomes, color blindness is much
more likely to occur in males. The effect is masked in
females even if there is a defect in one X chromosome,
the other will compensate. Table 2 reflects this effect
because of the reduced production of one of the
photopigments.
For dichromats, there are some hues which they
simply cannot perceive. Colors that would appear
completely different for trichromats, would appear to
be the same color (metamers) for the dichromat. As
with the anomalous trichromats, the dichromats fall
into one of three classes depending on which color
photopigment they are missing. Table 3 outlines the
types and percentages of dichromats.
Again, because of absence of the protein
necessary to produce photopigments, the prevalence
of color blindness in males is substantially higher
than in females as reflected in Table 3.Protonopes
anddeuteranopesare red-green color blind and
generally see only blues and yellows. Analogously,
tritanopesare blue-yellow color blind and see only
reds and greens. When the stimulus to the two
types of photoreceptors is equal, the dichromat will
perceive the color as gray. This is the so-called
neutral point. For protonopes and deuteranopes, the
neutral point are almost the same. For the protonope
the neutral point is approximately 495 nm and for
1122011 John Wiley & Sons, Inc.Volume 3, March/April 2011

WIREs Computational StatisticsColor theory and design
the deuteranope, the neutral point is approximately
500 nm. These would appear to be a slightly bluish
green to a trichromat individual. At wavelengths lower
than the neutral point, these dichromats would see a
rapidly saturated blue and wavelengths higher than
the neutral point they would see a rapidly saturated
yellow. Thus they can easily distinguish these colors.
Of course, while protonopes and deuteronopes are
deficient in the range of hues, they are not deficient
in the range of lightness and saturation. Unless a
color is pure or saturated, dichromats will still have
some perception of the deficient color. For example,
a protonope will have no red receptors. However, the
green photopigment is still slightly responsive a long
wavelengths and the rods also will also be receptive,
so some perception of the red color can be made,
although the protonope may not recognize it as ‘red’
(see Figure 8). Similarly, for the deuteranope. The
neutral point for the tritanope is about 570 nm, which
would appear yellow to a normal trichromat. Higher
wavelengths would appear red and lower ones green.
‘The description of dichromatic color perception
comes from both theory and from studies of a
few people who were dichromatic only in one eye.
However, it’s not absolutely conclusive. First, there
is no guarantee that the normal eye of a unilateral
dichromatic is really normal. Second, studies often
find that dichromatic color vision is much better
than that predicted by theory. The best guess is that
rods activate the red component red-green opponent
process to give dichromats a weak three-dimensional
color space.’ (Ref 12)
Monochromats are a most interesting case. They
may have only one photopigment for their cones or
as is often the case they have no cones, only rods.
Monochromats are truly color blind. Those with rods
only generally have poor vision. They can match any
color only in the sense of gray scale and so sat-
uration and brightness are difficult to distinguish.
## Green
## 12
reports that monochromats are exceedingly
rare occurring in 1 case in 10,000,000. Finally, brain
damage can create a very rare condition calledachro-
matopsia, individual who are also monochromats.
One interesting situation is the case of albinism,
lack of the pigment melanin. This is a genetic disorder
calledoculocutaneous albinism. In order to exhibit
albinism, one must inherit a mutant allele from both
the mother and the father, thus males and females are
affected equally for autosomal disorders. The disease
is characterized either by the failure to synthesize
pigment proteins or the failure of integratory proteins
to implement them into tissue. The pigment may be
missing from skin, hair, and eyes. People affected
with albinism frequently have difficulty with vision,
although it is not a given that they will be color blind.
Both albinism and color blindness have to do with the
failure to synthesize pigment proteins, but they can
and often are independent conditions.
## COLOR DESIGN
The use of color as a design element entails both
a physiological response from the viewer as well
as a response based in a cultural context. For
example, while many Western brides wear white
dresses as a symbol of purity, Chinese brides usually
wear red, a color that is a symbol of good luck.
The use of color symbolism varies tremendously
from culture to culture. However, there are still
certain physiological responses that are products of
the human visual system combined with experience
common to all humans. For example, distant objects
often appear as bluish and somewhat indistinct as,
for example, viewing mountains or forests from a
distance. This is a consequence the greater refractive
index for shorter wavelength of light. This bluish
hazing effect is known asaerial perspectiveand is an
experience common to all cultures. This is why the
sky appears blue. Similarly, this same refractive index
effect is why the moon appears reddish when low in
the sky.
From the perspective of data visualization, it
is fruitful to understand the distinction between a
cultural understanding of color and a physiological
response to color. From a physiological perspective,
color perception is a nearly automated function of
the brain. Color perception has evolved with human
beings over several hundred million years. As Green
## 12
points out
‘...color perception is fast, accurate, automatic, and
effortless. On the other hand, thinking is a relatively
recent evolutionary advance, and we are not yet very
good at it. Thinking means reading text, attaching
meaning to an icon, searching memory, etc. These
activities are relatively slow, error-prone, require
mental resources and effort and take learning.’
It is unlikely, even if an individual is a dichromat,
that he would confuse orange with blue, but even
an individual with completely normal vision can
easily misread a word in a paragraph. This is why
proofreading is a difficult task. The brain interprets
what it expects to see and the thinking process
required for careful reading is relatively slow and
error prone. There are certain physiological reactions
that are in essence hard-wired, such as grouping,
linking, and depth perception. There are also color
Volume 3, March/April 20112011 John Wiley & Sons, Inc.113

## Overview
www.wiley.com/wires/compstats
## VISUALIZATION
## V
## SUA
## L
## I
## Z
## A
## TI
## O
## N
## I
FIGURE 12|The word, VISUALIZATION, when rendered all in green
is much easier to read compared with the same word in multiple colors.
The all green word is naturally grouped because of the common color,
whereas that effect is not found in the multi-colored word.
design principles that are common and are interpreted
as harmonious or garish color combinations. These
principles are frequently used by artists and graphic
designers. Finally there are elements in the use of
color, which are interpreted in the context of culture.
Hard-Wired Perception
Several features of color perception are hardwired
into the human brain. As mentioned in the previous
paragraph, one of these is grouping and linking. If
groups are rendered in distinct colors, then color
associates groups together even if they are physically
separated in space. Figure 12 illustrates the effect
of color grouping by associating letters that have
the same color. This effect can be used in data
visualization by brushing clusters in a data display
with distinct colors to associate elements of the cluster.
A  second  related  illustration  is  found  in
Figure 13. In this figure, we illustrate the use of color
for spatial association. The point of Figure 13 is that
not only does the color provide a visual linking, but
also that this linking is enhanced with very distinctive
hues. In our CrystalVision software,
## 13
we provide the
three primary additive colors and the three secondary
additive colors as the default brushing colors, i.e.,
red, green, blue, cyan, magenta, and yellow. These six
colors provide, in some sense, the maximal separation
of hues. Figure 14 is a screen shot of CrystalVision
illustrating these grouping and linking effects.
Use of hue for grouping and linking is natural for
certain data visualization tasks. We have already seen
the effect for clustering. Hue is also good for showing
categorical (nominal scale) variable. People naturally
break the hues into categories, which they quickly
and easily judge as being the same or different. This
makes color an ideal way to indicate that objects have
similar or different meaning, function, or importance.
One can easily distinguish 12 or so colors: red, green,
blue, yellow, orange, magenta, pink, brown, cyan,
black, gray, white. On the other hand, hue is poor
for showing quantitative (continuous) variables, i.e.
more/less, bigger/smaller, because there is no natural
ordering. Some advocate use of the ‘rainbow scale,’
red–orange–yellow–green–blue–violet, as a natural
ordered representation with blue as less and red as
more. People may have learned this order to an extent,
but it is not a very powerful innate perception. If it
works at all, it is probably because it approximates
a brightness scale: blue is dark, green is middle
brightness, and yellow is high brightness.
Figure 15 illustrates another effect of color
contrast. The left panel of the figure has a dark
foreground  and  a  yellow  background.  On  the
right-hand panel the background color is yellow
and the foreground color is the dark blue–green.
These panels illustrate a perceptual the impact
of foreground–background contrast. Most printed
materials use black or colored ink on white paper,
which makes the darker color appear to pop out
of the background. Indeed, astronomers historically
have printed black and white sky photos as negatives
in order to see fine detail. On the other hand, the
light against a dark background, such as illustrated in
Figure 14, allows a much more detailed comparison
of hues. Both cyan and yellow tend to be considerably
less prominent against a white background which is
why we typically prefer to use a black background. In
FIGURE 13|The figure on the left is composed of all blue tones, whereas the samepattern on the right has bright (primary) contrasting colors. It
is considerably easier to distinguish the two groups on the right-hand side because of the color contrast.
1142011 John Wiley & Sons, Inc.Volume 3, March/April 2011

WIREs Computational StatisticsColor theory and design
FIGURE 14|Screen shot of CrystalVision parallel coordinate display illustrating the grouping and linking effects. The color bars on the upper
left-hand side are the six default brushing colors. Notice that the axes arecolored red while the axes labels are cyan. These are complementary colors
which are in some sense maximally different, and which add to white.
## TEXTTEXT
FIGURE 15|Foreground–background separation.
general, achromatic background are preferred in order
to have maximal use of color in data visualization.
Color Design Based on the Color Wheel
As we have indicated in the Color Theory Section,
the modern view of color perception depends on the
notion of tristimulus and the experimental results that
the normal human eye has three photopigments in its
cones, which roughly correspond to red, green, and
blue. These three hues are taken to be the primary
colors. Historically, the artistic view was that red,
yellow, and blue were the primaries. This has led
to the fact that some color wheels begin with these
as primaries and mixing these yield secondary and
tertiary hues which are usually characterized as RYB
color wheels. A color wheel which is based on RGB
as the primaries is usually known as HSV (hue,
saturation, and value) color wheel. A simplification
showing only fully saturated hues can be used in for
purposes of color design.
Figure 16 illustrates the RYB color wheel. The
RYB color wheel was originally described by Isaac
Newton in his 1704 treatise onOpticks.
## 14
## The 18th
century understanding of color vision was predicated
on the idea that red, yellow, and blue were the primary
colors. The use of the RYB color wheel as a model for
complementary colors and as a basic tool for art and
printing became well established. Two documents,
## Goethe
## 15
and Chevreul,
## 16
became the handbooks for
color theory. Even today the RYB color wheel is
Volume 3, March/April 20112011 John Wiley & Sons, Inc.115

## Overview
www.wiley.com/wires/compstats
## Red
## Red-
orange
## Orange
## Yellow-
orange
## Yellow
## Yellow-
green
## Green
## Blue-
green
## Blue
## Blue-
violet
## Violet
## Red-
violet
## (a)(b)
FIGURE 16|The RYB color wheel. These images are used under GNU Free Documentation License.
## Red
## Orange
## Yellow
## Chartreuse
green
## Green
## Spring
green
## Cyan
## Azure
## Blue
## Magenta
## Rose
## Violet
## (a)(b)
## H
FIGURE 17|HSV color wheel based on RGB primaries. The left image shows primary, secondary and tertiary hues. The right image show a more
continuous version of the hues. These images are used under GNU Free Documentation License.
used to describe complementary colors in art and
photography.
## 17
In general, color design principles suggest a
number of different strategies for using color. The
simplest strategy would be to choose amonotone
achromatic scheme. Such a scheme would not employ
any color at all, but use black, white, and shades of
gray. This kind of color scheme is sometimes used
by interior designers, but while it can be dramatic,
it also risks being boring. A related scheme is a
monotone chromatic scheme. Here, a single hue is
chosen, which is varied in lightness and saturation.
Again, this type of scheme can be boring. Another
scheme is ananalogous hues scheme. In such a use of
color, two or three hues close together in color space
are used. For example, shades of green or blue greens
can be used effectively. A more daring use of color is
acomplementary color scheme. Here complementary
colors on the color wheel are used. An example using
the RYB color wheel would be blue and orange
or the Christmas colors of red and green. Another
color scheme is thesplit complementary color scheme.
Instead of choosing the exact complementary color,
choose colors that are adjacent to the complementary
color. So that opposite to orange would be blue, but a
split complementary scheme might choose blue–green
and blue–violet. Usually one would want the split
complementary hues to be also different in brightness
and somewhat desaturated. A final strategy is atriad
color scheme. Here one can choose three colors equally
spaced around the color wheel. As with the split
complementary scheme, two of the hues should be
desaturated.
1162011 John Wiley & Sons, Inc.Volume 3, March/April 2011

WIREs Computational StatisticsColor theory and design
Examples of these schemes are found in US
postage stamps. These stamps are often design with
the color principles in mind. The 2010 Katherine Hep-
burn stamp is an example of the monotone achromatic
scheme. The 2010 Holiday Evergreens Forever stamp
is a good example of the monotone chromatic scheme.
The 2010 Love stamp is a good example of an analo-
gous hues scheme. The 2008 Winter Holidays stamp
has four different designs which illustrate the com-
plementary color scheme. The 2010 Lunar New Year
stamp is a good example of the triad color scheme.
While we cannot reproduce these stamps here, their
images are easily found on the web.
Figure 17 illustrates the HSV color wheel with
only the fully saturated colors indicated. The use of
this color wheel for color design has also been used,
although we do not pursue that idea for this article.
Color as a Cultural Expression
Color, of course, also evokes emotion, which, to a
large extent, is culturally based. Green
## 12
makes sug-
gestions of these responses:
•red: urgency, passion, heat, love, blood
•purple: wealth, royalty, sophistication, intelli-
gence
•blue: truth, dignity, power, coolness, melancholy,
heaviness
•black: death, rebellion, strength, evil
•white: purity, cleanliness, lightness, emptiness
•yellow: warmth, cowardice, brightness
•green: nature, health, cheerfulness, environment,
money, vegetation.
These, of course, are based primarily on impres-
sions from a Western culture. We do not discuss this
dimension of color at any length except to note that
there can be an emotional response to color so that the
use of color in data and scientific visualization should
be approached with these possible responses in mind.
## CONCLUSIONS
We have all experienced color to some extent, even
those who have limited color vision. In this article, we
have tried to systematically lay out principle of color
theory and design with the goal of making sense in the
development of scientific and data visualization soft-
ware. By understanding color theory, the functioning
of the human visual system, and basic color design
principles, we hope that the reader will appreciate
good usage of color when he or she sees it and will
employ these principles when designing displays.
## ACKNOWLEDGEMENTS
This article is based on lectures given by one of us (E.J.W.) in graduate courses inStatistical Data Miningand
inScientific and Statistical Visualization. Much of the discussion in the Section on Color Deficiencies in Human
Vision and the Subsection on Hard-Wired Perception isbased on material in Green (2004). The inspiration of
Marc Green is hereby gratefully acknowledged.
## REFERENCES
- Goldsmith TH. Optimization, constraint, and history in
the evolution of eyes.QRevBiol1990, 65:281–322.
- Munsell AH.A Color Notation. Boston, MA: G. H.
## Ellis Co; 1905.
- Munsell AH. A pigment color system and notation.Am
J Psychol1912, 23:236–244. doi:10.2307/1412843
- CIE.Commission Internationale de l’Eclairage Proceed-
ings, 1931. Cambridge: Cambridge University Press;
## 1932.
- Smith T, Guild J. The C.I.E. colorimetric standards
and their use.Trans Opt Soc1931–1932, 33: 73–134.
doi:10.1088/1475-4878/33/3/301
- Wright WD. A re-determination of the trichromatic
coefficients of the spectral colours.Trans Opt Soc1928,
30: 141–164. doi:10.1088/1475-4878/30/4/301
- Guild J. The colorimetric properties of the spectrum.
Philos Trans R Soc Lond (Ser A)1931, A230: 149–187.
- Lee H-C.Introduction to Color Imaging Science.Cam-
bridge: Cambridge University Press; 2005.
- Crayola Website. http://www.crayola.com/colorcensus/
history/chronology.cfm.  (Accessed  November  30,
## 2010).
- Jameson KA, Highnote SM, Wasserman LM. Richer
color experience in observers with multiple photopig-
ment opsin genes.Psychonom Bull Rev2001, 8:
## 244–261.
Volume 3, March/April 20112011 John Wiley & Sons, Inc.117

## Overview
www.wiley.com/wires/compstats
- Hayutin A.How Population Aging Differs Across
Countries: A Briefing on Global Demographics.Stan-
ford, CA: Stanford Center on Longevity; 2007.
- Green M. 2004. http://www.visualexpert.com/. (Ac-
cessed November 30, 2010).
- LuoQ,WegmanE,FuX.CrystalVision,aVisualData
Mining package for Windows, 2000.
- Newton I.Opticks. London: The Royal Society; 1704.
- Goethe JWv.Zur Farbenlehre. Dortmund: Harenberg
Kommunikation; 1810 (Republished 1979).
- Chevreul M-E. De la Loi du Contraste Simultan
## ́
edes
Couleurs et de l’assortiment des Objets Color
## ́
es, 1839.
- Mante H.Color Design in Photography.NewYork:
## Van Nostrand Reinhold; 1972.
## FURTHER READING
Eddy WF. An introduction to color systems,Stat Comput Stat Graph Newslett1990, 1:7–10.
Editors of Time-Life Books.Color. New York: Time Life Books; 1970.
Mante H.Photo Design: Picture Composition for Black and White Photography. New York: Van Nostrand Reinhold; 1971.
1182011 John Wiley & Sons, Inc.Volume 3, March/April 2011