> **VERSION**: v1 | **Last Updated**: 26/05/2026

Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.
```
eISSN: 2237-2083 | DOI: 10.17851/2237-2083.31.4.2009-2065
```
A Social-Semiotic Approach to Color Analysis in Digital Media:
Theory and Practice
Uma abordagem sociossemiótica para análise de cores
em mídias digitais: teoria e prática
André de Oliveira Matumoto
```
Universidade de São Paulo (USP), São Paulo, São Paulo / Brasil
```
andrematumoto@usp.br
```
https://orcid.org/0000-0003-3544-3576
```
Paulo Roberto Gonçalves-Segundo
```
Universidade de São Paulo (USP), São Paulo, São Paulo / Brasil
```
paulosegundo@usp.br
```
https://orcid.org/0000-0002-5592-8098
```
```
Abstract: This article aims to discuss the study of color from a social-semiotic
```
perspective. The article begins with an overview of Gunther Kress and Theo van
Leeuwen’s distinctive feature approach to color in their Grammar of Visual Design
```
(2021) and concludes that the authors base their claims primarily on paintings and
```
print media, which may skew the categories toward analog media. Drawing on color
```
theory, mainly the contributions of Rhyne (2017), this article argues that social-semiotic
```
analyzes can benefit from systematized and quantitative categories for color analysis,
especially for digital media corpora. The article introduces several analytic categories,
such as color harmony and the RGB color space, that are relevant to understanding
how color works in digital spaces. The paper proposes the use of the free and open
source software GIMP and ImageMagick for a qualitative and quantitative approach
to the distinctive features of color and for a better understanding of the complexity
of colors and their meaning potential. Based on these methodological procedures, the
distinctive feature approach is revised with Rhyne’s contribution. Finally, the categories
are applied to two stock images as a case study.
```
Keywords: social semiotics; color theory; grammar of visual design.
```
```
Resumo: Este artigo visa discutir o estudo da cor a partir da abordagem sociossemiótica.
```
Começando com uma visão geral da abordagem da cor por Gunther Kress e Theo
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2010
```
van Leeuwen, na sua Gramática de design visual (2021), conclui-se que os autores
```
baseiam as suas constatações principalmente em pinturas e mídias impressas, o que
pode enviesar as categorias em direção aos meios analógicos. Baseado na teoria
```
das cores, principalmente nas contribuições de Rhyne (2017), o artigo argumenta
```
que as análises que partem da semiótica social podem se beneficiar de categorias
especializadas para a análise da cor, principalmente para corpora de meios digitais.
O artigo introduz uma série de categorias analíticas, tais como a harmonia de cores
e o espaço de cor RGB, que são relevantes para compreender como funciona a cor
nos espaços digitais. Para demonstrar as categorias aqui apresentadas, são utilizados
os softwares gratuitos e de código aberto GIMP e ImageMagick. Eles permitem uma
abordagem qualitativa e quantitativa das características distintivas da cor e permitem
uma melhor compreensão da complexidade das cores e do seu potencial de significado.
Com base nesses procedimentos metodológicos, a abordagem de traços distintivos é
revista através das contribuições de Rhyne. Finalmente, como um estudo de caso, as
categorias são aplicadas em duas stock images.
```
Palavras-chave: semiótica social; teoria das cores; gramática do design visual.
```
Recebido em 31 de janeiro de 2023.
Aceito em 28 de agosto de 2023.
1 Introduction
People’s interest in understanding colors can be traced back to the
5th century B.C., at least in Western civilization. The works of Alcmaeon
of Croton are among the earliest evidence of the ancient Greeks’ attempts
```
to understand visuo-spatial perception (Pavlidis, 2021, p. 7). In the
```
millennia between Alcmaeon and modern society, many thinkers from
a wide variety of perspectives have put forward theories about colors.
Among them, we highlight two whose importance is still felt today: Isaac
```
Newton (1642-1726/27) and Johann Wolfgang von Goethe (1749-1832).
```
Newton is known, among other things, for his studies of light and color
```
(Pavlidis, 2021, p. 35-38), from which he derived the idea that colored
```
lights can be combined to produce other colors, as well as the claim that
```
white light is produced by combining different colors (Rhyne, 2017, p.
```
```
3). Goethe, in turn, was also engaged in the study of colors outside of his
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2011
```
literary works. In Zur Farbenlehre1 (1810), he created the basis for the
```
```
Red, Yellow, and Blue color model (Rhyne, 2017, p. 9), which is often
```
taught in elementary schools. He also opposed Newton’s color theory,
focusing instead on a qualitative model that considered perception and
```
the psychological and physiological effects of colors (Rhyne, 2017, p.
```
```
9; Pavlidis, 2021, p. 44). In this sense,
```
Goethe rejected the ‘sterilised’ approach of a theory of colour,
in which colour is deprived of its sensation, and is treated as an
objective phenomenon even without the need for an observer to
experience it. He was deeply certain that talking about colour has
no meaning outside of the context of its perception, through the
```
active sensation of vision (Pavlidis, 2021, p. 45).
```
We do not consider inconsistent the studies of color meaning
and effects and the studies of its materiality2. Instead, we conceive these
approaches as complementary. In this article, we will draw upon the social
```
semiotic approach (Hodge; Kress, 1988) to discuss color as a meaning-
```
making resource. As such, we move closer to Goethe’s conception of
color, since we cannot ignore the role of the observer in the semiotic
process. At the same time, social semiotics places importance on the
```
materiality and affordances of the semiotic resources (Jewitt; Bezemer;
```
```
O’halloran, 2016, p. 160).
```
It bears mentioning that the relation between materiality and
perception can be quite complex. Bateman, Wildfeuer and Hiippala
```
(2017, p. 27) discuss that the immediate relation between the semiotic
```
1 In 1840, Charles Eastlake translated the book into English and called it Theory of
Colours. It is worth noting that Eastlake omitted the parts where Goethe opposed
```
Newton’s observations (Possebon, 2009, p. 28-30; Rhyne, 2017, p. 11).
```
2 To return to Goethe’s proposal, although he opposed the scientific paradigm of his
time, he also conducted experiments on color phenomena. In one of them, which sparked
his opposition to Newton’s approach, he claimed that “Newton’s prismatic experiment
was erroneous in that there is no green colour directly exiting a prism, but green is
rather a composition of yellow and blue only after some distance from the prism, where
```
the two colours overlap” (Pavlidis, 2023, p. 44). However, “his observation is false
```
and depends on the topology of the experiment and typical light effects at boundaries”
```
(2023, p. 44). Similarly, Eastlake emphasized that Goethe would have received more
```
praise from the scientific community had he let others try to reconcile his findings with
```
current theory rather than attacking it so directly (1840, p. ix).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2012
modes and resources and sensory channels is misleading. The authors
point out that understanding the material qualities of the object does
```
not necessarily give us an understanding of how we perceive it (2017,
```
p. 27). For example, when we hear a sound, we receive a variety of
information outside of its physical properties: space, direction, distance,
etc. Conversely, as we will show in this paper, our perception may not
be able to comprehend many material properties of semiotic resources,
in our case colors.
Therefore, we will discuss the meaning-making potential of
colors, considering the fact that there are many aspects that may elude
our perception. We consider colors as both quantitative and qualitative
phenomena. Our proposal may help researchers systematize the analysis
of colors as a visual resource, especially when it comes to digital media.
To do so, we will first discuss how social semiotics, one of many
approaches that attempt to systematize a perspective on colors, has
historically analyzed them.
One cannot overestimate the importance of Gunther Kress’
contributions to the social-semiotic approach to multimodality. Together
with Theo van Leeuwen, they discussed fundamental concepts and tools
that are still productive for the analysis of different modes and media.
Reading Images, written in 1990, was one of the first systematic attempts
to understand the complexity of meaning in images. The book was
aimed at teachers and focused on children’s drawings and illustrations
```
in textbooks (Kress; Van Leeuwen, 1996, p. vi). The authors expanded
```
their scope and wrote the first edition of Reading Images: The Grammar
of Visual Design in 1996.
As the name implies, the authors intended to create a grammar for
the visual mode to “describe the way in which we depicted people, places
and things combine in visual ‘statements’ of greater or lesser complexity
```
and extension” (Kress; Van Leeuwen, 1996, p. 1). The second edition
```
of the book was published in 2006 and the third edition in 2021, with
each edition adding to and expanding the authors’ categories for visual
grammar analysis. In this article, we will focus specifically on how Kress
and van Leeuwen conceptualize color analysis.
In the first edition of Reading Images: The Grammar of Visual
```
Design (1996, p. 165), the authors discuss color primarily as a modality
```
```
marker under the categories of Saturation (a scale from full color to black
```
```
and white), Differentiation (a scale from diversity to monochrome), and
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2013
```
Modulation (a scale from a diversity of shades of the same color to the
```
```
use of a single shade). Color also appears briefly in the discussion of
```
the materiality of meaning: In discussing the potential for meaning in
brushstrokes, the authors cite, among other things, the use of color by
```
Wassily Kandinsky and Pieter Mondrian (1996, p. 236).
```
Prior to the second publication of Reading Images, Kress and van
Leeuwen published the article “Colour as a Semiotic Mode: Notes for a
```
Grammar of Colour” (2002), which laid the foundation for their approach
```
to color. As in their visual grammar, the authors introduce the possibility
```
of a grammar of color (2002, p. 343). To this end, Kress and van Leeuwen
```
discuss the meaning-making potential of color based on Halliday’s
```
(1978) metafunctions and provide a brief overview of the history of color
```
```
studies. Following Kandinsky (1977), the authors distinguish two types
```
```
of affordances3 for color: association (or provenance) and the distinctive
```
```
features of color (2002, p. 355).
```
Association refers to the meanings culturally and socially ascribed
```
to colors (Kress; Van Leeuwen, 2002, p. 355). For example, Red may
```
be associated with love, fire, or violence. These meanings come from
the interests and use that sign makers have historically given to colors
```
(Jewitt, Bezemer; O’halloran, 2016, p. 156-7), and as such we understand
```
them even when they appear outside their original context. This in turn
limits the way we interpret color.
While the affordances of a colour may be limitless in theory, in
practice they are not, and a plausible interpretation can usually be
agreed on, provided the context of production and interpretation
```
is taken into account (Kress; Van Leeuwen, 2002, p. 355).
```
The second affordance is a set of distinctive features based on
```
Jakobson and Halle’s (1956) phonology. For example, if we paint a heart
```
with a pale Red color, we may interpret it differently from a bright Red
heart. We may view the former as “sickly” or “fading,” as if it were a
perishing love, while we may view the latter as full of life.
In the second edition of Reading Images, color appears as a
modality marker and in a separate section on the meaning of materiality
3 The potential uses of a semiotic resource are based on its material features and on
```
the perception of the sign makers (Jewitt; Bezemer; O’halloran, 2016, p. 155; Van
```
```
Leeuwen, 2005, p. 273;).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2014
```
rather than under brushstroke analysis (Kress; Van Leeuwen, 2006, p. 225-
```
```
238). Following their proposal in the 2002 article, Kress and van Leeuwen
```
present their distinctive feature approach to color and its possibilities.
In the third edition of Reading Images, the framework given in
the second edition and in Kress and van Leeuwen’s 2002 article is largely
maintained. Although the authors mention some digital media such as
Microsoft PowerPoint, referring to an earlier work by van Leeuwen
```
(Van Leeuwen, 2011), most examples still refer mainly to paintings and
```
print media.
A fundamental aspect of social semiotics that the authors
emphasize is the impact that technology has on the meaning-making
```
process, particularly on “graphically realized semiotics” (Kress; Van
```
```
Leeuwen, 2021, p. 227). Conversely, there are several digital methods
```
for multimodal analysis. For example, Bateman, Wildfeuer, and Hiippala
discuss several tools for multimodal analysis in their book Multimodality
```
(2017), including computational methods such as neural networks for
```
```
image description, color recognition, and labeling (Johnson; Karpathy;
```
```
Fei-Fei, 2016, Karpathy; Fei-Fei, 2015).
```
Similarly, in this article, we will discuss how color theory
and graphic design software can assist social-semiotics researchers,
particularly in small-scale research. To this end, we rely primarily
```
on Rhyne’s (2017) propositions for color analysis in digital media.
```
We consider that the author’s detailed discussion of color theory is
compatible with Kress and van Leeuwen’s distinctive feature approach
and can greatly improve the analysis of digital corpora. We also present
methods for visual analysis using the free and open source software GIMP
```
(gimp.org) and ImageMagick ( i magemagick.org/). We selected both
```
```
software based on previous works (Matumoto, 2022a, 2022b; Matumoto;
```
```
Gonçalves-Segundo, 2022a, 2022b) and chose to discuss replicable and
```
free methods for accessibility reasons.
We organized the article as follows: First, we discuss the
distinctive features approach as proposed by Kress and van Leeuwen
```
(2002; 2021). Then, we introduce some analytic categories as proposed by
```
```
Rhyne (2017), the software GIMP and ImageMagick tools, and how they
```
allow us to visualize the author’s claims. We then apply the categories in
a case study of two stock images, followed by the concluding remarks.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2015
2 The distinctive feature approach to color
As mentioned earlier, we ground our considerations on the
```
social-semiotic framework (Hodge; Kress, 1988), in particular on the
```
```
Grammar of Visual Design and its contributions to color analysis (Kress;
```
```
Van Leeuwen, 2002; 2021). Building on Rhyne’s (2017) work, we intend
```
to extend Kress and van Leeuwen’s categories to the analysis of digital
media and provide methods for color analysis.
```
Kress and van Leeuwen’s distinctive feature approach (2002;
```
```
2021, p. 244-9) aims to analyze the meaning potential of colors based on
```
their material properties, such as Hue and Saturation. Table 1 summarizes
the properties of colors:
Table 1 – Color distinctive features
Distinctive
feature Description
```
Value Refers to the scale from “maximally light (white) to maximally dark(black)” (Kress; Van Leeuwen, 2021, p. 245).
```
```
Saturation Refers to the scale from saturated, or pure, colors to the softest anddullest colors (Kress; Van Leeuwen, 2021, p. 245).
```
```
Purity Refers to the scale from color purity, such as bright Red, to color hybridity,such as Orange-red, a mixture (Kress; Van Leeuwen, 2021, p. 245).
```
Modulation
Refers to the scale from fully modulated colors, such as the many
```
shades of Blue, to flat colors, such as a single shade of Blue (Kress; Van
```
```
Leeuwen, 2021, p. 245).
```
```
Transparency Refers to the scale from transparency to opacity (Kress; Van Leeuwen,2021, p. 246).
```
```
Luminosity Refers to the ability of a color to glow, to ‘stand out’ by itself (Kress;Van Leeuwen, 2021, p. 246-7).
```
```
Differentiation Refers to the scale from monochromatic registers to a varied palette(Kress; Van Leeuwen, 2021, p. 247).
```
Hue
```
Refers to “the scale from Blue to Red” (Kress; Van Leeuwen, 247-
```
```
8). Broadly speaking, it refers to what we often consider as the colors
```
themselves, such as red, blue, green, etc.
```
Source: Created by the authors.
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2016
These features are a robust set of categories for color analysis,
and as the authors note, it is important to keep in mind the fact that all
these features work together and therefore the meaning potential of a
```
particular color (or set of colors) depends on the configuration of the
```
```
individual features (Kress; Van Leeuwen, 2021, p. 247). Moreover, signs
```
```
function as “complex constellations” (Bateman; Wildfeuer; Hiippala,
```
```
2017, p. 116). This means that the composition and the participants4
```
represented are as important as the colors used to represent them. From
a social-semiotic point of view, we should always consider the context
for the creation of the image and the relationship between the semiotic
```
choices and the discourses and ideologies (i.e., the association that results
```
```
from the semiotic choices).
```
Returning to our example of the two hearts painted Red, we
can confirm that our meaning hypothesis is based on the Red hue, its
Saturation, the associations we attribute to these features, and the fact that
we have drawn a heart, often associated with love. If we were to draw
a campfire or a bloody landscape instead, we would no longer associate
```
Red with love (but with fire and violence), but we might still interpret
```
```
Saturation in a similar way (for example, as a signifier of intensity).
```
Thus, as Kress and van Leeuwen noted, the possibilities of colors
are not unlimited: They arise from culturally recognized uses, physical
properties, and the way we perceive colors. Given the interplay of
these aspects, especially perception, color analysis can be particularly
challenging because what a color “is” may not be readily recognized in
its entirety. This is noteworthy when we consider the way the authors
formulate their categories:
These distinctive features indicate, as in Jakobson and Halle’s
```
(1956) distinctive feature phonology, a quality which is visual
```
rather than acoustic, and is not systematized, as in phonology, as
```
structural oppositions but as values on a range of scales (Kress;
```
```
Van Leeuwen, 2002, p. 355).
```
```
In contrast to the phonology of Jakobson and Halle (1956), Kress
```
and van Leeuwen consider that each feature are values on a scale, such as
```
“light to dark,” rather than oppositions (such as [+voiced] and [-voiced]).
```
```
4 A generic term for people, places, and things represented in the semiosis (Kress; Van
```
```
Leeuwen, 2021, p. 45, 113–5).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2017
However, the authors do not provide specific measures to determine, for
```
example, what is “maximally light” or “maximally black” (Kress; Van
```
```
Leeuwen, 2002, p. 355).
```
This means that the analyzes may depend largely on perception,
which does not always provide the most accurate representation of
```
the colors of the image (Figure 1). In addition, in some cases only a
```
few particularly salient colors are fully discernible, which can turn the
categories into contrasts rather than scales. For example, different screens
```
(e.g., computer monitors and cell phone screens) can slightly alter the
```
colors displayed, which can affect how we interact with colors and, more
importantly, how we analyze them.
Figure 1 – Hue examples
```
Source: Created by the authors.
```
Figure 1 shows four sets of colors that we have created using
```
four color wheels based on Rhyne (2017, p. 33). The first is the original
```
```
file, while the other three simulate color deficiencies (from left to right):
```
Protanope, Deuteranope, and Tritanope. To most people, all four wheels
will look different, while some people5 will have difficulty perceiving
the differences between the first wheel and the other three.
Even outside of color deficiency, other factors can affect color
perception, such as lighting conditions, positioning of the color, or what
we focused on previously. This is particularly noticeable in optical
illusions, such as the example in Figure 2.
```
5 According with the NHS (National Health Service), 1 in 12 men are and 1 in 200
```
women have some type of color vision deficiency.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2018
Figure 2 – Optical illusion
```
Source: Wikimedia commons (2007).
```
The two Orange spots are the same color, but we perceive them
```
differently (we might say one is darker than the other). Unlike the naked
```
eye, software such as GIMP, as we will demonstrate, can show us not
only that they are the same, but also what they are in terms of Saturation,
Brightness, and so on.
These factors illustrate the complexity of color and color analysis.
Kress and van Leeuwen’s scale approach is one way to account for the
idiosyncrasies of color, although it does not present specific methods
for accurately analyzing color data. However, we should remember not
to downplay the role of perception in the semiotic process. Most people
```
who interact with images (whether on the internet or on print media)
```
will not have these tools to properly measure what color is. Designers,
however, have a deep understanding of how color works and how to
use it to convey what they want to communicate. Just as Kress and van
```
Leeuwen (2021, p. 238) inform us about the deeply material history of
```
color, we argue in this article that to understand the current semiotics
of color, we must understand the processes by which they are created.
With this in mind, we propose categories and methods that allow
us to quantify and systematize the properties of color, particularly in
digital media. With the aid of color theory, we can better understand
what colors are and how they work. Using GIMP and ImageMagick, we
can describe the various parameters that make up colors. Thus, we can
effectively use the distinctive feature’s scales to analyze the meaning
potential of colors. Therefore, our proposal introduces concepts and
methods currently used by sign makers, which allows us to generate
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2019
hypotheses based on tools used in the semiotic process. This opens the
door to comparable and reproducible results for color analysis, which is
particularly useful for understanding the use of color by different groups
in different contexts.
3 Basic concepts of color theory
From the perspective of color theory, the concept of the color
```
model is particularly important. According to Rhyne (2017, p. 1), a color
```
model is “a structured system for creating a full range of colors from a
small set of defined primary colors.” Also,
There are three fundamental models of color theory. […] these
```
models are as follows: (1) the Red, Green, and Blue (RGB) color
```
model of lights and display originally explored by Isaac Newton in
```
1666; (2) the Cyan, Magenta, Yellow, and Key Black (CMYK) model
```
for printing in color originally patented by Jacob Christoph Le Blon in
```
1719; and (3) the Red, Yellow, Blue painters model fully summarized
```
```
by Johann Wolfgang von Goethe in 1810 (Rhyne, 2017, p. 1).
```
In Table 2, we briefly summarize these three models:
Table 2 – The color models
Color
model Description Visual representation
RGB
“The RGB color model assembles the
primary lights of Red, Green, and Blue
together in various combinations to
produce a broad range of colors […].
The RGB color model is termed as
an additive color model in which the
combination of the Red, Green, and Blue
primary lights produces White light […]
The RGB color model is used in various
technologies producing color images,
such as conventional photography and
the display of images in electronic
```
systems” (Rhyne, 2017, p. 1).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2020
Color
model Description Visual representation
CMYK
“The CMYK color model is designed to
support color printing on White article.
The CMYK color model is termed as
a subtractive color model in which the
starting point begins with a White or
light surface. Color pigments Reduce the
reflection of the original White light. The
color inks thus subtract from the original
White surface. Typical output devices
for the CMYK color model include
color inkjet, laser, and dye-sublimation
```
printers” (Rhyne, 2017, p. 5).
```
RYB
“The RYB color model is a subtractive
color model for mixing painting
pigments […]. Starting with White
paper, RYB color pigments when
combined together yield Black, similar
to the CMYK color model […] The
RYB color model is used in the arts and
```
arts education” (Rhyne, 2017, p. 7).
```
```
Source: Created by the authors. Images adapted from Rhyne (2017, p. 2).
```
Since we will be using a digital corpus, we will focus mainly
on the RGB system. First, we can visually represent colors on a color
```
wheel, which we can use to analyze how hues relate to each other (Rhyne,
```
```
2017, p. 79). We can represent the RGB and CYMK models with the
```
same color wheel6, while the RYB model is different from the two, as
shown in Figure 3:
6 As seen in the visual representations in Table 2, the RGB and CYMK models are
complementary, since their primary and complementary colors are the same but inverted
```
for each model (Rhyne, 2017, p. 82).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2021
Figure 3 – Color wheels
Color wheels for RGB and CYMK Color wheel for RYB
```
Source: Adapted on Rhyne (2017, p. 83).
```
Both wheels present hues7, tints, tones, and shades. In the outer
area are the hues, the purest, most saturated colors. Tints are hues mixed
with white and are placed next to them. Tones are mixed with gray and
are placed in-between tints and shades, hues mixed with black. The
```
innermost region is the neutral gray (Rhyne, 2017, p. 83-5).
```
The color wheel allows us to detect color harmonies. Kress and
```
van Leeuwen (2021, p. 238) mention the concept but do not elaborate
```
on it. Harmonies are a way to systematize how colors can work well
```
together based on a main (or key) color (Rhyne, 2017, p. 86). In Table
```
3, we present the possible color harmonies for both color wheels, using
Red as the main color:
Table 3 – Color harmonies
Color Harmony RGB/CYMKcolor wheels RYB color wheel
```
Monochromatic: a harmony
```
between a hue and its tints,
```
tones, and shades (RHYNE,
```
```
2017, p. 87).
```
7 We will utilize the term “hue” to refer to one of color’s distinctive feature as well as
to pure colors.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2022
Color Harmony RGB/CYMKcolor wheels RYB color wheel
```
Analogous: a harmony
```
between three colors adjacent
to each other, of which the
middle one is the main color
```
(Rhyne, 2017, p. 88).
```
```
Complementary: a harmony
```
between one color and the
color opposite to it in the color
```
wheel (Rhyne, 2017, p. 89).
```
Split complementary: a
harmony between the
main color and the two
colors adjacent to its
complementary color
```
(Rhyne, 2017, p. 90).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2023
Color Harmony RGB/CYMKcolor wheels RYB color wheel
Analogous complementary:
a harmony between
the key color and an
analogous harmony of
its complementary color
```
(Rhyne, 2017, p. 89).
```
Double complementary:
a harmony between two
adjacent colors and their
respective complementary
```
colors (Rhyne, 2017, p. 92).
```
Tetrad-Rectangular: a
harmony between four
equally distant colors
```
(Rhyne, 2017, p. 93).
```
Tetrad-Square: a harmony
between four equally distant
colors, three steps from each
```
other (Rhyne, 2017, p. 94-5).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2024
Color Harmony RGB/CYMKcolor wheels RYB color wheel
```
Diad: a harmony between two
```
colors, two steps from each
```
other (Rhyne, 2017, p. 95).
```
```
Triad: a harmony between
```
three equally distant colors
```
(Rhyne, 2017, p. 96).
```
```
Source: Created by the authors. Images based on Rhyne (2017).
```
In addition, the color wheel provides a visual representation of
```
warm and cool colors (Figure 4), which also influences the relationship
```
between colors and their potential for meaning:
The color wheel can be divided into warm and cool colors. In
general, Green, Blue, and Purple are defined as cool colors, while
Yellow, Orange, and Red are grouped as warm colors. Warm colors
tend to advance and expand in space. Cool colors tend to recede
and contract in space. White, Gray, and Black are considered to
be neutral in this regard. As a result, colors can have physiological
```
and psychological effects on people (Rhyne, 2017, p. 85).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2025
Figure 4 – Cool and Warm colors
```
Source: Adapted from Rhyne (2017, p. 86).
```
The meaning-making potential that arises from color harmonies
and the dichotomy of cool and warm colors is expansive. For example,
complementary harmonies can be linked with associative affordances,
```
such as Red contrasting with Blue and Cyan (e.g., in a contrast between
```
```
fire and water). They can also lead to what we might call “emergent
```
meanings,” or new possibilities based on the properties of colors. For
```
example, in Matumoto (2022b), we discussed how the games Aero
```
```
Fighters 2 (VIDEO SYSTEM, 1994), Sonic Wings 2 (VIDEO SYSTEM,
```
```
1996), and Strikers 1945 II (PSIKYO, 1997) use color harmonies to make
```
Brazil stand out among the other countries, reinforcing the representation
of Brazil as a forest in contrast to the representation of most other
countries in the game.
Cool and warm colors evoke associative meanings simply by
their names. They also have practical uses, for example in interior design:
warm colors are perceived as closer, while cool colors are perceived as
further away. We can use this to make a room seem more inviting, cozy, or
spacious and relaxing, depending on the “temperature” of the color used.
```
Apart from the color wheel, we can represent web colors (colors
```
```
for digital applications) by their RGB values or in hexadecimal format
```
```
(HEX triplet) (Rhyne, 2017, p. 66). RGB values refer to the values of
```
```
Red, Green, and Blue, from 0 (lowest value) to 255 (highest value), that
```
each color has for each of these three parameters. The HEX triplet “is a
six-digit and three-byte hexadecimal number used to represent a color”
WarmWarm
Cool Cool
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2026
```
(Rhyne, 2017, p. 67). See Table 4 for a range of colors and their RGB
```
values and HEX triplets.
Table 4 – Examples of RGB values and HEX triplets
Color RGB values Hex triplets
255, 0, 0 #FF0000
0, 255, 0 #00FF00
0, 0, 255 #0000FF
255, 0, 100 #FF0064
0, 100, 0 #006400
50, 150, 255 #3296FF
100, 90, 90 #645A5A
255, 255, 255 #FFFFFF
0, 0, 0 #000000
```
Source: Created by the authors.
```
We represent the RGB notation of a color as three values separated
by commas. The first refers to the value of Red, the middle to the value of
Green, and the last to the value of Blue. This means that the RGB color
```
space includes a total of 16,777,216 colors (or 256 to the 3 rd power). In
```
Table 4, we have modulated different values of each parameter to create
nine RGB configurations. The first three are each pure Red, Green, and
Blue, while the next three are mixtures. The seventh has no dominance
between the three parameters, resulting in a grayish color. The last two
have equal values for all three parameters but do not result in gray. This
is because the lowest possible RGB values result in pure black, while the
highest result in White. The HEX triplets represent the same information,
but in a way that is easier for computers to process 8: the first two digits
refer to Red, the middle two to Green, and the last two to Blue.
```
8 Cf. Rhyne (2017, p. 67) for a summary of how to read HEX triplets.
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2027
4 Analyzing colors with GIMP and ImageMagick
An in-depth analysis based on RGB values and HEX triplets
makes it possible to precisely locate the colors under investigation. For
this purpose, the Color Picker Tool 9 in GIMP can be used to collect this
```
type of data (Table 5).
```
Table 5 – Color picker tool on GIMP
Image Description
```
In the Toolbox of GIMP (on the left side of
```
```
the program) we will find several tools10,
```
```
including the color picker tool (highlighted
```
```
by a gray box).
```
When we select it, the cursor turns into
an eyedropper and crosshairs. If we click
on the place where the crosshairs point, a
small window will open.
9 Whenever we introduce a new tool or option, we will provide a link to the GIMP
Team Documentation Page, which describes the tool and how to use it.
10 Tools with a small triangle in the bottom-right corner are swappable with a related
tool by right-clicking its icon. In the color picker’s case, we can swap it for the measure
tool, which functions similarly to a ruler.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2028
Image Description
In this window, we will find several
pieces of information. In the columns, the
researcher can choose which color model
to display. In this case, the left column is
the HSV color space and the right column
is the RGB model. HEX refers to the HEX
triplet, and finally, X and Y refer to the
coordinates of the selected pixel. Pixels are
the smallest units in digital images.
We return to Figure 2 to verify that the
two Orange spots are indeed made up of
the same color. The difference between the
```
examined pixels is their positions (X and
```
```
Y values).
```
If we want to sample more than one point
```
(or pixel) of the image, we can select the
```
sample average option in the Tool options,
which are located under the Toolbox by
default. The Radius options refer to the
area that will be sampled by the tool.
When this option is selected, GIMP
displays the average color of the selected
area instead of the exact pixel selected.
```
Source: Created by the authors.
```
Using the color picker tool of GIMP, we can identify specific
colors in the composition or select a group of colors to determine the
overall color in a specific area of the image. This means that we do not
have to consider colors as a comparative category, in the sense that Hue,
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2029
Saturation, Brightness, etc. are understandable and quantifiable on their
own, not in comparison to the rest of the composition.
```
The HSV (Hue, Saturation, and Value) and the HSL (Hue,
```
```
Saturation, and Lightness) are three-dimensional representations of the
```
```
RGB color model11 (Rhyne, 2017, p. 58). In Table 6, we briefly discuss
```
the individual parameters:
Table 6 – HSV and HSL color spaces
Parameter Description
Hue
Refers to color gradations shown in a circle that begins and ends at the
color Red, at 0 degrees. The color wheel shown earlier follows this
organization, and starting from Red, Cyan, for example, is at 180 degrees,
```
directly opposite to Red (Rhyne, 2017, p. 61).
```
Saturation
Refers to the distinction between a particular hue and the neutral gray in
the center of the color wheel, where no hue dominates. For this reason, the
purest and most saturated colors on the color wheel are in the outer areas
```
farthest from the center (Rhyne, 2017, p. 61).
```
Value
Refers to the brightness of a particular hue and varies with Saturation in
the HSV color space. It ranges from 0%, pure black, to 100%, colors are
```
present (Rhyne, 2017, p. 62).
```
Lightness
Refers to the degree of illumination of a given Hue in the HSL color
space. It ranges from 0%, or no light, to 100%, or full illumination
```
(Rhyne, 2017, p. 62).
```
```
Source: Created by the authors.
```
If we return to the example in Table 5, we find in the left column
the HSV description of the Orange used in the image: for Hue, it is 38.5º
```
(Figure 5) of Red; for Saturation, it is 100, since it is a pure color; and
```
finally, for Value, it is 82%, which means that it is not a totally light color.
As for Lightness, we can use the following mathematical formulas
```
to calculate the Lightness of a color (Saravana; Yamuna, 2016, p. 464):
```
```
11 Cf. Rhyne (2017, p. 63-66) for a discussion regarding both models and their visual
```
representations.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2030
The first three equations convert the RGB values from a scale
of 0..255 to a scale of 0..1. We will again use the example from Figure
2. Since we need the maximum and minimum values of RGB, we omit
```
Green and use only Red (209/255 = 0.81) and Blue (0/255 = 0). We can
```
now use these values in the last equation:
This gives us ≈ 41%. So the Lightness of #D18600 is 41%. For
```
comparison, #FFFFFF (pure white) has a Lightness of 100% and #000000
```
```
(pure black) has a Lightness of 0%.
```
Figure 5 – Diagram of hue or color wheel
```
Source: Adapted from Rhyne (2017, p. 61).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2031
Furthermore, the FG/BG Color tool allows us to visualize and
```
edit these data (Table 7).
```
Table 7 — FG/BG Color
The FG/BG Color menu contains several relevant data points. By default, on the right side,
we can check the RGB and HSV values of the color, both on a scale from 0 to 100 and on a
scale from 0 to 255. The “HTML Notation” refers to the HEX triplet of the color. Note that
```
it has no hashtag (#) at the beginning.
```
On the left, GIMP displays a visual representation of the image’s Saturation by default. The
Hue scale is in the thinner colored column, while the Saturation and Value scale is shown
in the rectangle right next to it. The value increases on the Y-axis, while the Saturation
```
increases on the X-axis. For example, in the upper left corner (in white) is 0 for Saturation
```
and 100 for Value, while in the lower right corner is 100 for Saturation and 0 for Value.
The currently displayed color is the Orange from Figure 2, indicated by the crosshairs on
the rectangle and the line on the thinner column.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2032
GIMP presents four other visual representations: CYMK, Watercolors, Wheel, and Palette.
In this article, we will focus on the wheel representation.
The outer ring represents Hues that vary on a 360-degree scale. The inner triangle, in
turn, represents Saturation and Value. Saturation scales vertically, while Value scales
horizontally.
This visual representation is particularly useful for determining color harmonies.
```
Source: Created by the authors.
```
One last parameter that the color picker tool of GIMP displays is
the Alpha channels. For some images, it is possible to display a range from
```
transparency (0%) to total opacity (100%). For example, images in jpg
```
```
(Joint Photographic Experts Group) format do not support transparency
```
and instead show a color, often white, in the background, while images
```
in png (Portable Network Graphic) format can (Table 8).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2033
Table 8 – jpg vs. png
Saved in the jpg. format, the image
displays the missing part as white.
```
Saved in the png. format (and with the
```
```
alpha channels enabled), the image
```
displays the missing part as transparency
```
(shown as a gray pattern).
```
```
Source: Created by the authors.
```
Transparency is not limited to alpha channels, but it is important
to note that we can analyze it via GIMP just as we can the other color
features.
For a more comprehensive color analysis, we can use the
histogram from GIMP. A histogram is a graphical representation of
```
the distribution of data for a given variable. The Histogram (found in
```
```
Windows → Dockable dialogues12) represents “the statistical distribution
```
```
of color values” (GIMP Documentation Team, 2023, s.p.) and provides
```
```
options for Value (brightness distribution), Red, Green, and Blue
```
```
(intensity distribution per RGB channel), and alpha (opacity distribution).
```
In Table 9 we discuss the histogram based on a stock image.
12 Whenever we show a tool’s path, we will highlight it in gray. The path will start from
the menu bar on GIMP’s upper part. We will also highlight options present in GIMP.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2034
Table 9 — Histogram in GIMP
We will use an image from the Microsoft 365 library. The image shows a colorful
arrangement of fruits and vegetables.
We can see the full histogram in the figure above. For simplicity, we divided the window
into three parts, described as follows.
```
In the upper area (red) we can change which channels the histogram displays (Value, Red,
```
```
Green, Blue) and the display mode: linear, which is useful for photos, or logarithmic, which
```
```
is useful for images that “contain substantial areas of constant color” (GIMP Documentation
```
```
Team, 2023, s.p.). We can also change the histogram display from linear to perceptual
```
space. Here we will use the perceptual space and the linear display.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2035
```
In the middle (Green) we see the actual histogram. On the left, we show how it appears on
```
```
GIMP, while on the right we show the same data as a graph. The horizontal axis (X) scales
```
```
from 0 (black) to 255 (white). In this example, we used “value” as the variable. This means
```
```
that we have a scale from the lowest to the highest Value (“brightness”). The vertical axis
```
```
(Y) shows the number of pixels for a given value. For example, 4% of the pixels of the
```
image have a Value of 255, which means they have the maximum brightness.
If we need to check how many pixels are in the range of a value, we can select a section of the
histogram. In the example above, we select the range from 102 to 153 of Value. The range is
highlighted in white and below it the exact selection is displayed numerically.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2036
If we select the RGB option, GIMP shows the Red, Green, and Blue channels and how
they overlap. White are the areas where all three overlap, while the Red, Green, and Blue
areas show where these colors do not overlap. GIMP also shows the overlap of two colors:
Red + Blue = Magenta
Red + Green = Yellow
Blue + Green = Cyan
It is worth mentioning that these values are not the colors themselves, but their respective
parameters of Red, Green, and Blue individually. This means that, for example, for a color
```
composed of (100, 0, 255), each parameter is plotted in the histogram.
```
In the case of the image, Red is particularly present at the upper end of the scale, while
Blue is most present at the lower end of the scale. Green accents can also be seen in the
```
middle of the scale. Thus, we can see that Red and hues close to it (yellow, orange etc.)
```
are substantially more saturated than other hues. This is due to the fact that, overall, red
```
composition (closer to 255) is more prevalent than Green or Blue, a fact that may not be
```
easily discernible with mere perception.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2037
Finally, in the lower area, we will find various statistics and other information. In Pixels,
GIMP shows the number of pixels in the image, while Count shows how many pixels are in
the selected area. Percentile refers to the percentage of pixels in the selected range.
Median refers to the middle value in the selected range, while mean indicates the average
value. Finally, Std dev refers to the standard deviation of the selected range or how
```
homogeneous the distribution of values in the selected range is (GIMP Documentation
```
```
Team, 2023, s.p.), which can be used in research as an indicator of the color purity of the
```
composition.
GIMP automatically converts its values to a number from 0 to 1, to the thousandth digit.
These values represent the scale from 0 to 255 — the scale visually represented by the
histogram. For example, 0.369 corresponds to 94.095 on a scale of 255, which means that
```
the RGB value of the image averages 94 (out of 255).
```
The standard deviation, simply put, indicates how much is the average dispersion from the
mean. In our case, it is 0.296. If we were to plot the data on a graph, for example, we could
```
calculate one standard deviation below the mean (0.369 - 0.296 = 0.073) and one standard
```
```
deviation above the mean (0.369 + 0.296 = 0.665), which would give us an interval of
```
0.073 ≤ x ≤ 0.665.
Thus, the higher the standard deviation, the higher the hybridity of the colors, whether from
```
the total set (RGB) or for each channel individually.
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2038
```
To visualize how each channel affects the image, we can use the Hue-Saturation tool (Colors
```
```
→ Hue-Saturation...). The GIMP tool lets you edit the Hue, Lightness, and Saturation of
```
```
the primary RGB colors and the complementary colors (Cyan, Magenta, and Yellow).
```
This allows us to locate areas of interest for each color. It should be noted, however, that
depending on the colors used, we may also select colors that fall between a primary and
a complementary color. In the image to the left, we desaturated all colors except for the
Yellow hue, whose Saturation was set to maximum. This highlights the Yellow areas and
some colors between Green and Yellow, and between Yellow and Red. If we do the same
process but saturate Red and Green to the maximum, we can see how they relate to Yellow.
```
Source: Created by the authors.
```
The histogram can give us a quick overview of the image and
its dominant channels. It can also be used in conjunction with the Select
by color and the Fuzzy selection tools, both of which are included in
the Toolbox. These tools allow us to select a specific color in the image:
The first tool selects all instances of a particular color, while the second
selects a delimited area where the color occurs. In the histogram, GIMP
```
shows how many pixels (both in count and percentile) are allotted to
```
the selected color. These tools also have a threshold option. By default,
this is set to 0, which means the tool will only select the exact color we
clicked on. If we increase the threshold, GIMP will average and select
colors similar to the selected one, as shown in Table 10.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2039
Table 10 – Select by color tool
We have highlighted both tools in the figure above with a dark box. We can change them by
right-clicking on their icons. The magic wand icon points to the Fuzzy selection tool, while
the square icon points to the Select by Color tool.
Both tools offer almost identical options. Relevant to this article is the threshold scale
mentioned earlier and the drop-down menu directly below it. In it, the researcher can
choose which parameter GIMP should use to select colors, such as Red, Green, and Blue
values. By default, the “Composite” parameter is used, which takes into account the overall
composition of the color.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2040
When the Histogram tab is open, we can right-click on the image and go to Select →
```
All (Select all), which will select all pixels in the image. In our example, the image has
```
1,906,128 pixels.
```
We then use the Select by Color tool (with a threshold of 75) and click on a Yellow pixel in
```
```
the image. The selected area is outlined with dashed lines. The histogram (in pixels) shows
```
how many pixels we have selected. In our case, it is 193,011 pixels, or about 10% of the
entire image.
```
Source: Created by the authors.
```
Another important tool for color analysis is the Palette Import
```
and Editor (Windows → Palettes). GIMP allows the researcher to import
```
colors from any image and in this way create a palette based on the
imported colors. In Table 11 we briefly describe the process.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2041
Table 11 — Importing palettes in GIMP
If we right-click on one of the palettes preloaded with GIMP, the Import Palette... option
is displayed.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2042
In the Import New Palette menu, we can import from an already created palette or from an
```
image (second option).
```
```
In the import options we can choose how many colors the palette should contain (up to
```
```
10,000), how many columns the palette should display, and finally we can group colors
```
with the Interval option. Although the limit is 10,000, it may not be possible to load all
colors. Since a small change in the parameters will change the color, the image may
contain several similar colors, which GIMP will add to the palette individually. Therefore,
increasing the interval value will display an average color generated from a set of similar
```
colors (GIMP Documentation Team, 2023, s.p.).
```
```
In the Colorcube Analysis (Colors → Info → Colorcube Analysis), GIMP shows how
```
many unique colors are present in the image. The software detects 388,632 unique colors
in our image, which far exceeds the maximum capacity of the palette.
Therefore, we can convert the image — most likely in RGB format — to index colors
```
(Image → Mode → Indexed...), which limits the colors to a maximum of 256.
```
Since GIMP tries to calculate an average value for the color of the image, it may change
significantly. It is also important to note that due to the averaging of the image, the colors
displayed may not exactly match the original colors, so it is not an accurate representation,
but an overall view of the colors in the image.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2043
In our example, we converted the image to 256-indexed colors and then back to RGB.
We then created a 256-color palette. If we double-click on the created palette, the palette
editor window will open. In it, we can change the number of columns displayed and, most
importantly, check the data of each color. If we double-click on one of the colors, the Edit
Palette window will open, which looks exactly like the FG/BG Color window. Note that
changes made in the Edit Palette Color will affect the created palette.
```
Source: Created by the authors.
```
Depending on the quality and/or complexity of the image, the
palette may be more or less indicative of the overall color composition of
the image. Another option is the Colour wheel analysis plugin by Rebecca
```
(username rbreu), who also provides instructions for installing and using
```
the plugin. We used this tool to create Figure 6 based on our example:
Figure 6 – Color wheel of the image
RGB Index color Full-color wheel
```
Source: Created by the authors.
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2044
The plugin maps the colors on a color wheel, which allows us to
determine the color harmonies present in the image. As we can see, the
image uses colors from almost all hues except Blue and its adjacent hues.
It is worth mentioning that this refers to the image as a whole, so all the
elements depicted are taken into account. GIMP allows us to delete parts
```
of the image, which can be productive for color analysis (Figure 7). There
```
are several ways to achieve this, for example, using Fuzzy Selection and
Select by Color tools or the Paths and Free Selection tools.
Figure 7 — Purple areas vs non-Purple areas
```
Source: Created by the authors.
```
For a quantitative approach to color, GIMP offers the possibility
to export a text file of the generated histogram. Under Color → Info
→ Export Histogram... there are several options for displaying the
```
information in a comma separated values (CSV) file. Table 12 describes
```
the Export Histogram option and its output file.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2045
Table 12 – Export histogram in GIMP
In histogram file, the user can select the location of the file.
“Bucket Size” “lets you control the number of values considered as similar and counted in
the same ‘bucket’. A higher bucket size will produce fewer buckets, and thus fewer rows
```
in the exported file” (GIMP Documentation Team, 2023, s.p.).
```
```
Sample Average produces either a histogram of all image layers (“yes”) or only the current
```
```
layer (“no”).
```
```
There are three options for the output format: Pixel count (pixels per bucket), normalized
```
```
(pixels per bucket divided by the pixel count of the image), and percent, which does the
```
```
same as normalized but displays the values as percentages (GIMP Documentation Team,
```
```
2023, s.p.).
```
Range Start Value Red Green Blue
0 9336 36513 84317 216677
16 39960 46834 52292 94719
32 37441 50903 43448 63539
48 41285 48659 41558 67666
64 36605 32875 53648 35025
240 90709 90030 3251 2502
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2046
We can access the output file with programs like Microsoft Notepad or Notepad++, which
is open source and free, but also with spreadsheet programs like Microsoft Excel. In the
example on the right, we created the file with a bucket size of 16 and a Percent output.
“Range start” refers to the value from 0 to 255 for each of the parameters. For example, the
penultimate row with a “Range Start” value of 48 refers to the 49th bucket and includes all
pixels between the values 48 and 63. Therefore, the last four numbers in row 48 in order
mean that “41,285 pixels have a value between 48 and 63,” “48,659 pixels have a Red value
from 48 to 63,” “41,558 pixels have a Green value from 48 to 63,” and “67,666 pixels have
```
a Blue value from 48 to 63” (GIMP Documentation Team, 2023, s.p.). The last row ranges
```
from 240-255, the most saturated colors. As can be seen, Red is the representative channel
in this range.
```
Source: Created by the authors.
```
Depending on the resolution of the image, trying to determine the
colors individually may be overwhelming with this tool. Alternatively,
ImageMagick can be used to determine exactly what colors are present
in an image and how pronounced they are, allowing the user to determine
which colors are dominant.
Table 13 shows how to list the color composition of an image.
Table 13 – Color composition using ImageMagick
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2047
In Microsoft Windows, we can access the folder of the image. In the top bar Windows shows
the path of the folder/file. On the left side, there is an icon for the folder. When we click on it,
we can type “cmd” and press Enter. A window with a command prompt will open.
It lists the path to the folder of the image. We can then type: magick image.ext -format
%c histogram:info:- > list.txt 13. image.ext refers to the file name and extension of the
```
image (png., jpg., webM., etc.), while list.txt refers to a plain text file containing the color
```
information.
The filename in our example is 01, and its extension is .png. So the string becomes magick
01.png -format %c histogram:info:- > list.txt. After a few seconds, a file named “list.txt”
appears in the image’s folder.
```
127: (0,0,0) #000000 black
```
```
30: (0,0,2) #000002 srgb(0,0,2)
```
```
14: (0,0,4) #000004 srgb(0,0,4)
```
```
13: (0,0,5) #000005 srgb(0,0,5)
```
```
5: (0,0,7) #000007 srgb(0,0,7)
```
```
2: (0,0,8) #000008 srgb(0,0,8)
```
```
4: (0,0,9) #000009 srgb(0,0,9)
```
```
243: (0,1,0) #000100 srgb(0,1,0)
```
```
11: (0,1,2) #000102 srgb(0,1,2)
```
```
6: (0,1,3) #000103 srgb(0,1,3)
```
```
6: (0,1,4) #000104 srgb(0,1,4)
```
```
9: (0,1,5) #000105 srgb(0,1,5)
```
We can open the file with the standard Windows software Notepad or other text editors
like Notepad++.
In the file, each line corresponds to a color in the following format: first, how many pixels
```
correspond to the color; its RGB parameters; its HEX triplet value; and finally, its srgba value14.
```
As it is, ImageMagick has mapped 388,577 colors. Most of them contribute little to the
overall image, corresponding to less than 100 pixels out of 1,906,128. This is because,
```
for example, a color characterized in RGB parameters as (224, 111, 232) is different from
```
```
(224, 108, 232). Although they are hardly noticeable, ImageMagick considers them as
```
different and therefore counts them as separate entries.
13 Code presented by user chas_prinz on Reddit https://www.reddit.com/r/GIMP/
comments/rn8fyn/getting_colour_percentages_for_a_colour_indexed/
14 sRGB, or standard RGB, is a color space created in 1996 by Microsoft and Hewlett-
```
Packard Company (RHYNE, 2017, p. 40).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2048
So we can use index colors to Reduce the number of colors and group these similar colors.
We will now use 256 colors. Although the document is clearer this way, it can still be
cumbersome to read.
To better analyze and organize the data, both on an RGB and index color basis, we can use
Microsoft Excel. First, we can open the file in a text editor, use the Find and Replace function
```
(Ctrl+F), go to the Replace tab, and replace all “:” (colon) with nothing (leave “Replace
```
```
with” blank15). When we copy and paste the text lines, Excel will automatically divide them
```
into different rows. We recommend leaving the first row blank. If the pasted data is in a
single column, we can select all the rows and go to Data → Text to Columns. We first select
Delimited, then click Next. Select “Space” from the Delimiters menu and then click Next and
Finish. Excel will automatically split the data into columns. In the first row, we can now label
```
each column (e.g. “Number of Pixels”, “RGB”, “HEX”, etc.). Select the labels and go to Data
```
→ Filter. Excel now allows the researcher to filter the data, for example, by highest to lowest
pixel count. This allows the researcher to determine, for example, which colors are dominant
in the composition and better analyze the use of color in the image.
15 We can also use the find and replace function on Microsoft Excel. However, Excel
can incorrectly interpret the colon due to how to software reads data. It will then change
the data shown.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2049
In our example, we can see that in the index colors, the following are the five most common
```
colors in the image: (16,7,5), (14,20,4), (0,0,0), (34,22,8), (217,170,0). Excel can automatically
```
sum the selected values. If we select the number of pixel values for these five colors, Excel
will show in the lower right corner that they total 50,432 pixels. If we then select the entire
column, Excel displays 1,906,128, the same number shown by GIMP. Using these values, we
can see that the five predominant colors account for about 2.6% of the entire image.
We can then import this data into GIMP and create a palette for the dominant colors. Here
we will select the 24 dominant colors from the image. First, we write a header in software
like Notepad++ as follows:
GIMP Palette
#
After the hashtag, we need to insert the RGB values of the colors. These values must not
be between parentheses and must be separated by a comma and a space. To speed up the
process, we can use Find and Replace to remove the parentheses and replace the commas
```
(,) with a comma + space (, ).
```
We can then import this file into GIMP using the Import palette... menu but instead of
choosing an image as the source, we choose a palette file.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2050
By default, GIMP arranges the colors from left to right according to their order in the txt.
file. In this way, we get a visual representation of the colors by which occur most often.
```
Source: Created by the authors.
```
Color theory and software such as GIMP and ImageMagick can
greatly enhance color analysis from a social-semiotic perspective. The
categories presented here are consistent with Kress and van Leeuwen’s
approach, both in their names and in their descriptions. Thus, rather than
creating new categories from scratch, we will use Rhyne’s contributions
to better adapt the features for digital color analysis in Table 14:
Table 14 – Color distinctive features revised
Distinctive
feature Description
Value
```
Refers to the scale from pure black (0% in HSV color space) to pure
```
```
light (100% in HSV color space) (Rhyne, 2017, p. 62, Kress; Van
```
```
Leeuwen, 2021, p. 245).
```
Saturation
```
Refers to the scale from pure colors (our hues) to neutral gray. On the
```
color wheel, the most saturated colors are in the outer region. It is one
of the parameters in both HSV and HSL color spaces and scales from
```
0% (no dominance) to 100% (pure color) (Rhyne, 2017, p. 61, Kress;
```
```
Van Leeuwen, 2021, p. 245).
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2051
Distinctive
feature Description
Purity
Refers to a scale between the use of a single color and its hues,
```
tints, tones, and shades (purity or monochromaticity) and a variety
```
```
of analogous colors (hybridity) (Rhyne, 2017, p. 86, Kress; Van
```
```
Leeuwen, 2021, p. 245).
```
Modulation
Refers to the degree of monochromatic modulation, i.e., the use of a
register within a color or its variety of hues, tints, tones, and shades
```
(Rhyne, 2017, p. 86, Kress; Van Leeuwen, 2021, p. 245).
```
Transparency
Refers to the scale from transparency to opacity. For some image
```
extensions (e.g., png.), transparency can be quantified by alpha levels. For
```
```
others, we detect it by color overlap (Kress; Van Leeuwen, 2021, p. 246).
```
```
Luminosity (or
```
```
Lightness)
```
Refers to the degree of brightness of a color. In HSL color space,
```
Lightness varies with Saturation from 0% (pure black) to 100% (presence
```
```
of color) (Rhyne, 2017, p. 62, Kress; Van Leeuwen, 2021, p. 246-7).
```
```
Differentiation Refers to the scale from monochrome registers to a full range of colorsand harmonies (Rhyne, 2017, p. 86, Kress; Van Leeuwen, 2021, p. 247).
```
Hue
Hue in HSV and HSL color spaces varies in a 360-degree wheel,
with 0/360 being Red. Hue can also be represented by its RGB
configuration, i.e., how much Red, Green, and Blue are in the color.
Finally, it can also be represented as a HEX triplet, which represents
```
the RGB values in a hexadecimal format (Rhyne, 2017, p. 61, 66).
```
```
Source: Created by the authors.
```
5 Case study: color analysis of two stock images
We will comparatively analyze two images to demonstrate the
methods presented here and discuss the potential for meaning in colors.
We will again draw on the Microsoft 365 image database. We searched for
the keywords “Europe” and “Africa” and obtained the results in Figure 8:
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2052
Figure 8 – Stock image for “Europe” and “Africa”
```
Source: Microsoft (2023).
```
Searching for “Europe” yields 11 images, while searching for
“Africa” yields eight images. An important difference between the results
```
is the nature of the participants (Kress; Van Leeuwen, 2021, p. 45, p.
```
```
113-5): Europe is represented by people, cityscapes, natural landscapes,
```
and animals, while Africa is represented mainly by animals and natural
landscapes.
Although the sample size is small, this difference could be relevant
in terms of how Europe and Africa are culturally defined and semiotically
realized. For example, one of the “Europe” images depicts the Eiffel
Tower, which references the image to France, while one of the “Africa”
images depicts the Pyramids of Giza in Egypt. Both are recognizable
images for their respective countries, but in the context of the stock images
presented, they have different meanings. If we place the Eiffel Tower in
a series with other landscapes, we can consider it as one representative
of European architecture among others. Conversely, the pyramids are the
only man-made structure in Africa, which, in addition to emphasizing
natural landscapes, can create an associative meaning of Europe as a
metropolitan, modern place, and Africa as a natural, ancient place.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2053
In addition, we can determine the location of the ‘Europe” results
with relative precision, which means that we can more easily distinguish
and recognize different parts of Europe. In the “Africa” results, on
the other hand, the landscapes, apart from the pyramids, can only be
identified as savannah. This represents Africa as a single landscape that
is culturally recognized as a stereotypical image of “Africa,” which in
turn reproduces an ideological notion of the African continent, devoid
of its many cultures and biomes.
This is significant in that while stock images are intended to be
inherently neutral so that they are suitable for a variety of contexts and
uses, there are nevertheless discourses that inform the semiotic choices
employed, not necessarily from image to image, but based on the images
chosen to represent a participant. Therefore, we will focus on two images
```
(Figure 9), one for each set, and analyze how the colors used in both
```
relate to discursive constructions of Europe and Africa.
Figure 9 – Selected images from each search result
```
Source: Microsoft (2023).
```
```
The European image shows the Amagertorv (Amager Square) in
```
Copenhagen, Denmark. The image depicts a person with a cup of coffee
in the foreground and the cityscape in the background displaying several
buildings, pedestrians, and the Stork Fountain in the center.
In the African picture, there is an elephant in the foreground. In
the background, there is an acacia tree and some undergrowth. Based
on these descriptors, we can assign the image to the savannah biome,
```
one of the biomes where elephants live (Kingdon, 1997, p. 305), but we
```
cannot identify a specific country.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2054
As for the use of colors, we can first analyze the images using
the Colorcube analysis to determine the number of colors in each image,
and the histogram to quantify the total values and RGB composition of
```
the images (Table 15).
```
Table 15 — Histogram analysis
Europe Africa
Number of unique colors: 1,040,592 Number of unique colors: 212,041
```
The Value (“brightness”) - that is, the distinction between black and full color - tends
```
toward the higher scale for both images. We used the scale selection to determine the range
that accounts for 50% of the pixels of the images. According to the histograms, the elephant
image has relatively more bright pixels than the city image. This means that although the
elephant and the ground are darker than the background and make up a significant portion
of the image, brightness prevails.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2055
```
The RGB composition presents peaks for all three colors, as well as some mixtures (such
```
```
as Yellow and Magenta). To understand how each channel modulates the composition, we
```
can use the Hue-Saturation… tool.
We have lowered the Saturation of all colors except Red and Yellow. To make the contrast
between the two colors more visible, we inverted the hues so that Red became Magenta, and
Yellow became Blue. As we can see, the image consists mainly of tones between Orange
and Yellow. The presence of Green in the histogram represents Yellow, which is a mixture
of Green and Red. Blue, on the other hand, is present because the light behind the elephant
```
is almost white, that is, in RGB (255, 255, 255).
```
Red Green
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2056
Blue Cyan
Yellow Magenta
In contrast to the elephant image, the city shows several colors. By desaturating all but
one of the hues, we can determine where each color appears most strongly. Green and
```
Magenta appear very sparsely; Blue, Cyan, and Yellow appear in specific areas, such as on
```
rooftops. Red covers the entire composition.
```
Source: Created by the authors.
```
Furthermore, we can list the colors present on the image with
GIMP’s Index colors and ImageMagick. These tools yield the results
displayed in Table 16.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2057
Table 16 — Color quantification
```
Source: Created by the authors.
```
Based on this data, we can propose how color creates meaning in
these images. As mentioned earlier, semiotic resources are simultaneously
historically situated and motivated by sign makers during the sign-making
process. This means that while there are some culturally established uses
```
(e.g., Red as a sign of violence), we often need to consider the resource
```
on its own terms and how it is used in this specific semiotic artifact.
In the case of the elephant image, there are two main hues: Orange
```
and Yellow, as well as some intermediate hues (e.g., Yellowish Orange).
```
Since they form a dividing line between the ground and the sky, we can
```
interpret that this diad harmony (Orange ⇔ Yellow) creates a contrast
```
between these two levels. On the other hand, since Orange and Yellow
are close to each other, the meaning could be, conversely, that these two
realms are similar and not opposite.
Orange, in turn, also covers the cityscape. We can likewise
consider Blue and Cyan in the roofs and the stork statue as harmonious.
Cyan-Blue is complementary to Orange, while Blue is complementary
to Yellow. Thus, they form a double complementary harmony. This has
two immediate effects on the image: first, the Cyan on the statue against
the background of the overall Orange composition makes the statue stand
out more, even though it is very small. Second, it creates layers in the
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2058
```
image: The Blue and Cyan roofs separate the square and the buildings
```
from the sky. Since their hues complement each other, a striking but
harmonious contour is created for these two areas.
We can make some meaning hypotheses about the harmonies
created, but as mentioned earlier, all the distinctive features work together
to make a color effective. Therefore, we can analyze more features to
make more meaning hypotheses. So far, we have been able to use Hues,
```
Purity (number of colors), and Differentiation (number of harmonies)
```
to establish possible opposing relationships that are likely or unlikely
depending on how the other features work. So, we can analyze Saturation,
Modulation, and Luminosity to better understand the images.
As for Saturation, we can use the index color to group the colors
into a manageable number. We can also use the Color Picker tool to find
the average Saturation of an area of the image. In Table 17 we provide
the processed images.
Table 17 — Indexed colors
By using indexed colors and the Color Picker
tool, we can group parts of the image and
check Saturation. Saturation leads to different
```
groupings: From the foreground to the
```
background, the image becomes progressively
```
less saturated; there is also an overlap in the
```
middle area between the elephant’s saturated
head and the less saturated light in the
background. Finally, the bottom and the legs of
```
the elephants are also saturated (except for the
```
```
black areas), which could confirm the dichotomy
```
of the top and bottom areas of the image.
In the case of the cityscape, there are
several Saturation spots, of which the
Orange-Yellow lights are the most
important. The high Saturation of these
areas creates points of interest in the
overall composition, especially since
they contrast with the grayish tones of
some of the buildings and the square.
```
Source: Created by the authors.
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2059
```
Interestingly, the sky in both images is almost white (255, 255,
```
```
255), which means that they have almost 100% Lightness. In the case
```
of the elephant image, the sky looks like a light source, while in the
case of the city image, it does not. Instead, the artificial lights look like
standout lights.
This is due not only to the colors used but also to the composition.
For example, the first image frames the skylight in the center, a salient
```
area (Kress; Van Leeuwen 2021, p. 198), while the second image confines
```
the sky to the upper area. In addition, the purity of the white color looks
less interesting than the many colors in the lower areas, especially in the
center, where the coffee cup, the building in the middle, and the statue
directly below are located.
By combining Saturation, Lightness, and image composition,
we can create and add to our hypothesis. First, Saturation adds three-
dimensionality to the image of the elephant by adding a dichotomy of
foreground and background in addition to the dichotomy of top and
bottom. In the image of the city, on the other hand, Saturation highlights
the artificial lights in different areas of the square. However, one of the
effective areas of light in the city image, the sky, is not very noticeable.
We can now analyze the features of these two images
```
comparatively: The modulation of multiple hues can create a “complex”
```
image, as opposed to a “simple” image. In these cases, the contrast can
```
come from the nature of what is being depicted (a city versus an animal),
```
which can make the city be seen as more complex and desirable13. This is
also supported by the fact that the same colors in the sky do not have the
same effect, but an opposite one: The “natural” light of the city is not of
interest, while the same light envelops the entire image of the elephant.
Considering this hypothesis, we can interpret that the diadic
harmony in the elephant image creates a relationship of similarity, since
```
13 We can point to a similar effect in the Street Fighter II game (Matumoto, 2022a).
```
```
Both the Brazil stage (‘scenario’) and the US stage depict a waterfront location.
```
```
However, color plays a key role in typifying (Barthes, 1973; 1977; Van Leeuwen,
```
```
2001, p. 95) — i.e., using stereotypes to create types rather than individuals — the
```
people and architecture of Brazil, which are constructed as one and the same because
both have a similar brown hue. The US stage, on the other hand, uses a variety of
colors to individualize the people and separate them from the scenery. This creates a
contrast between Brazil, an isolated and homogeneous space, and the US, an open and
individualized, diverse space.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2060
they are both natural participants, in contrast to the double complementary
harmony in the city image, where the Blue and Cyan hues create a barrier
between the city and the sky. This, in turn, is related to the discourses that
envelop the stock images of “Europe” and “Africa”: While the former
is an amalgam of many landscapes while maintaining its metropolitan
character, Africa is exclusively a natural or ancient landscape.
As we can see in this case study, colors provide multiple
sources of meaning that can be analyzed individually or in combination.
However, if we analyze a group of features, we can better determine
which hypothesis the semiosis is most likely to point to. In addition,
compositional resources can further enhance color analysis and vice versa.
6 Conclusion
In this paper, we have presented both analytical categories and
methods for color analysis in digital media within a social-semiotic
framework. Our theoretical contribution lies in the dialogue between
the social-semiotic framework and color theory, through which we can
analyze colors’ features as a truly quantitative resource, i.e., we can
classify each feature into a comparative scale. Besides, we provide
methods that allow reproducible results for color analysis. Among recent
```
works on color, we can cite Johannessen et al.’s (2021) “A Corpus-
```
Based Approach to Color, Shape, and Typography in Logos”, in which
color analysis is based on Kress and van Leeuwen’s distinctive feature
approach. The authors also demonstrate their approach using Adobe
Photoshop, although a discussion of how to use that tool is not their
primary focus. By discussing how to use the free and readily available
tools presented here, we hope to have shown how the analysis can be
supported by the use of some quantitative approaches that provide a more
systematic description of colors and their meaning potential.
As mentioned earlier, color presents a number of challenges
for visual analysis. This is primarily because of how we interact with
it. This means that designers need to understand both how color works
and how audiences will interact with what they produce. Color is
currently a sought-after resource outside of professional design as well:
```
from Instagram (www.instagram.com) to Canva (www.canva.com), non-
```
professionals are learning how to work with color in digital media, from
photos to presentations.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2061
Back to color deficiencies: Designers need to avoid color schemes
that are difficult for some people to read. For example, according to Heron,
```
Crameri, and Shephard (2021), scientific images can be misleading or
```
inaccessible to some of the public because of the colors used, which are
difficult for people with color deficiencies to read. This opens up the
discussion of how meaningful colors are in different contexts and how
we should pay attention to their use and analysis.
The fact that people are increasingly interacting with color, and
that this interaction is mediated by digital media, necessitates semiotic
methods based on these practices and media. In this sense, this article
offers an example and a call for color analysis based on digital corpora
and methods. In this regard, there are a number of other software besides
```
GIMP and ImageMagick that can support research (e.g., https://inkscape.
```
```
org/), and as mentioned earlier, we have not discussed all the possibilities
```
of GIMP and ImageMagick. This means that social semiotics can be
constantly revitalized and updated in line with its socially grounded
approach to help semioticians understand the semiotic process and
current trends.
Authorship statement
Both authors contributed extensively to all aspects of this article.
André de Oliveira Matumoto was responsible for conceptualizing the
study, conducting formal analysis, funding acquisition, performing
investigations, developing the methodology, creating visualizations, and
drafting the original manuscript. Paulo Roberto Gonçalves Segundo was
responsible for conceptualization, funding acquisition, validating the
findings, and reviewing and editing the manuscript.
Acknowledgments
```
The research for this article was supported by FAPESP (Fundação de
```
```
Amparo à Pesquisa do Estado de São Paulo), grant 2020/13090-1.
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2062
References
```
BATEMAN, J.; WILDFEUER, J.; HIIPPALA, T. Multimodality:
```
Foundations, Research and Analysis – A Problem-Oriented Introduction.
```
Berlin: De Gruyter Mouton, 2017.
```
```
COLOUR vision deficiency (colour blindness). NHS, England, UK, 01
```
Apr. 2019. Available at: https://www.nhs.uk/conditions/colour-vision-
deficiency/#:~:text=It’s%20a%20common%20problem%20that,to%20
someone%20with%20normal%20vision. Visited on: 21 Jan. 2023.
GIMP DOCUMENTATION TEAM. GIMP Documentation. GIMP.
Available at: https://www.gimp.org/docs/. Visited on: 21 Jan. 2023.
GIMP main page. GIMP, 2023. Available at: https://www.gimp.org/.
Visited on: 21 Jan. 2023.
HALLIDAY, M.A.K. Language as Social Semiotic. London: Arnold, 1978.
```
HERON, P.; CRAMERI, F.; SHEPHARD, G. How rainbow colour maps
```
can distort data and be misleading. The conversation, 06 Oct. 2021.
Available at: https://theconversation.com/how-rainbow-colour-maps-
can-distort-data-and-be-misleading-167159. Visited on: 21 Jan. 2023.
```
HODGE, R.; KRESS, G. Social Semiotics. Cambridge: Polity Press, 1988.
```
IMAGEMAGICK main page. ImageMagick Studio LLC, 2023. Available
```
at: https://imagemagick.org/index.php. Visited on: 21 Jan. 2023.
```
INKSCAPE main page. Inkscape, 2023. Available at: https://inkscape.org/.
Visited on: 21 Jan. 2023.
```
JAKOBSON, R.; HALLE, M. Fundamentals of Language. Mouton: The
```
Hague, 1956.
```
JEWITT, C.; BEZEMER, J.; O’HALLORAN, K. Introducing
```
Multimodality. New York: Routledge, 2016.
```
JOHANNESSEN, C. M.; TVEDE, M. L.; BOESEN, K. C.; HIIPPALA, T.
```
A Corpus-Based Approach to Color, Shape, and Typography in Logos. In:
```
PFLAEGING, J.; WILDFEUER, J.; BATEMAN, J. A. (eds.). Empirical
```
Multimodality Research: Methods, Evaluations, Implications. Berlin/
```
Boston: De Gruyter, 2021. p. 159–185.
```
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2063
```
JOHNSON, J.; KARPATHY, A.; FEI-FEI, L. Densecap: Fully
```
convolutional localization networks for dense captioning. In: IEEE
```
Conference on Computer Vision and Pattern Recognition (CVPR), 2016,
```
Las Vegas, US. Proceedings […]. Las Vegas, USA: IEEE, p. 4565-4574,
```
DOI: https://doi.org/10.1109/CVPR.2016.494.
```
```
JUNCTIONS (username). Optical grey squares orange brown. Wikimedia
```
Commons, 10 Apr. 2007. Available at: https://commons.wikimedia.org/wiki/
```
File:Optical_grey_squares_orange_brown.svg. Visited on: 21 Jan. 2023.
```
KANDINSKY, W. Concerning the Spiritual in Art. New York: Dover
Publications, 1977.
```
KARPATHY, A.; FEI-FEI, L. Deep visual-semantic alignments for
```
generating image descriptions. In: IEEE Conference on Computer Vision
```
and Pattern Recognition (CVPR), 2015, Boston, USA. Proceedings […].
```
Boston, US: IEEE, p. 3128-3137, DOI: 10.1109/CVPR.2015.7298932.
KINGDON Jonathan. The Kingdon Field Guide to African Mammals.
Academic Press: San Diego, California, 1997.
```
KRESS, G.; VAN LEEUWEN, T. Colour as a semiotic mode: notes for a
```
grammar of colour. Visual communication, [S.l], v. 1, n. 3, p. 343-368, 2002.
```
DOI: https://doi.org/10.1177/147035720200100306. Available at: https://
```
www.researchgate.net/publication/237623450_Colour_as_a_Semiotic_
Mode_Notes_for_a_Grammar_of_Colour. Visited on: 21 Jan. 2023.
```
KRESS, G.; VAN LEEUWEN, T. Reading Images. Geelong, Australia:
```
Deakin University Press, 1990.
```
KRESS, G.; VAN LEEUWEN, T. Reading Images: The Grammar of
```
visual design. 1 ed. London/ New York: Routledge, 1996.
```
KRESS, G.; VAN LEEUWEN, T. Reading Images: The Grammar of
```
Visual Design. 2 ed. London/ New York: Routledge, 2006.
```
KRESS, G.; VAN LEEUWEN, T. Reading Images: The Grammar of
```
Visual Design. 3 ed. London/ New York: Routledge, 2021.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2064
MATUMOTO, A. de O. A construção brasilidade em Street Fighter II:
```
uma perspectiva sociossemiótica. In: GONÇALVES-SEGUNDO, P. R.;
```
```
ARAES, C. R.; CASTANHEIRA, C.; ISOLA-LANZONI, G.; SILVA, L.
```
P. da; MITSUNARI, N. A. S.; DOMINGUES, T. (eds.). Estudos do texto e
do discurso: perspectivas contemporâneas. São Paulo, SP: FFLCH/USP,
2022a. p. 109–133. Available at: https://www.livrosabertos.sibi.usp.br/
portaldelivrosUSP/catalog/book/935.
MATUMOTO, A. de O. Sobrevoando a Amazônia: a construção verbo-
imagética do Brasil em três jogos shmup. Entrepalavras, Fortaleza, v. 12,
n. 3, p. 92–122, 2022b. DOI: https://doi.org/10.22168/2237-6321-32512.
```
MATUMOTO, A. de O.; GONÇALVES-SEGUNDO, P. R. Towards a
```
social-semiotic approach to visual analysis of two-dimensional games:
a toolkit. Texto Livre, Belo Horizonte, vol. 15, no. 1, p. e39398, 2022a.
```
DOI: https://doi.org/10.35699/1983-3652.2022.39398.
```
```
MATUMOTO, A. de O.; GONÇALVES-SEGUNDO, P. R. Uma Proposta
```
Sociossemiótica para a Análise Visual de Jogos Bidimensionais: a
construção de significado em Ducktales. Entreletras, [S.l.], v. 13, n.
1, p. 344–369, 2022b. DOI: https://doi.org/10.20873/uft2179-
3948.2022v13n1p344-369.
PAVLIDIS, G. A Brief History of Colour Theory: Foundations of Colour
Science. Cham, CH: Springer International Publishing, 2021.
POSSEBON, E. L. A teoria das cores de Goethe hoje. 2009. 168 f.
Doutorado em Design e Arquitetura – Universidade de São Paulo, São
Paulo, 2009. DOI 10.11606/T.16.2009.tde-10052010-144639. Available
```
at: http://www.teses.usp.br/teses/disponiveis/16/16134/tde-10052010-
```
144639/. Accessed on: 13 Jul. 2023.
PSIKYO. Strikers 1945 II. Kyoto, Japan: Psikyo, 1997.
RHYNE, T.-M. Applying color theory to digital media and visualization.
Boca Raton: CRC Press, Taylor &Francis Group, 2017.
```
SARAVANAN, G.; YAMUNA, G.; NANDHINI, S. Real time
```
implementation of RGB to HSV/HSI/HSL and its reverse color space
models. In: International Conference on Communication and Signal
```
Processing (ICCSP), 2016, Melmaruvathur, India. Proceedings […]:
```
IEEE, p. 0462-0466, DOI: 10.1109/ICCSP.2016.7754179.
Rev. Estud. Ling., Belo Horizonte, v. 31, n. 4, p. 2009-2065, 2023.2065
VAN LEEUWEN, T. Introducing Social Semiotics. London: Routledge, 2005.
VAN LEEUWEN, T. The Language of Colour: An Introduction. London:
Routledge, 2011.
```
Video System. Aero Fighters 2 (Sonic Wings 2). Kyoto, Japan: SNK, 1994.
```
Video System. Sonic Wings Special. Kyoto, Japan: Media Quest/Phoenix, 1996.
VON GOETHE, J. W. Zur Farbenlehre. Tübingen, DE: Cotta, 1810.
Available at: https://archive.org/details/gri_c00233125012873531.
Accessed on: 13 Jul. 2023.
VON GOETHE, J. W. Goethe’s theory of colours. trans. by Charles Lock
Eastlake. London, UK: John Murray, 1840. Available at: https://archive.
org/details/goethestheoryco01goetgoog. Accessed on: 13 Jul. 2023.

---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, tdd, vcs, api]
