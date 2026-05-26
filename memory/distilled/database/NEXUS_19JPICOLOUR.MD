> **VERSION**: v1 | **Last Updated**: 26/05/2026

JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 1
Abstract—Colour wheels are a tool for ordering and understanding
hue. Different colour wheels differ in the spacing of the colours around
the wheel. The opponent colour theory, Munsell’s colour system, the
standard printer’s primaries, the artist’s primaries, and Newton’s rainbow
all present different variations of the colour wheel. I show that some of
this variation is owing to imprecise use of language, based on Berlin
and Kay’s theory of basic colour names. I also show that the artist’s
colour wheel is an outlier that does not match well to the technical colour
wheels because its principal colours are so strongly connected to the
basic colour names.
1 INTRODUCTION
C
OLOUR wheels provide a way to describe the ordering
of hue and, in some cases, to aid understanding colour
```
mixing. The artist’s colour wheel (Figure 1), epitomised
```
by Itten [Itt70], is used extremely widely in teaching. Its
primary colours are red, yellow and blue.This is the colour
wheel that students meet in primary school. In this wheel,
the opposite of blue is orange. When students meet more
advanced material in colour theory, they find apparent con-
tradictions. The printer’s colour wheel has primaries cyan,
magenta, and yellow, which the student might be taught
to understand as a refinement of blue, red, and yellow.
But curiously for the student the colour labelled “blue”
in the printer’s colour wheel is opposite to yellow, not to
orange. In my own early introduction to colour, I found the
art books’ insistence that orange was the opposite of blue
conflicted with my observation that, in many works of art
and design, yellow appeared to me to be the more apposite
opposite. Further confusion comes to the student when they
meet the opponent colour theory, in which there are four
```
principal colours, with blue opposite yellow (Figure 3); and
```
Munsell’s colour system in which there are five principal
```
hues, with blue opposite yellow-red (Figure 4). The chal-
```
lenge for the educator is in explaining these differences.
These differences can be downplayed in educational
material. For example, one text for art students states that
“Colour wheels must always have an even number of hues
and that number must be divisible by three. Any other com-
bination would not be a true and accurate colour wheel” [Ble12,
p.66, emphasis mine]. This is a simplification by the author
for the benefit of the students, as the author is well aware
of the NCS and Munsell colour systems which have four
School of Engineering and Computer Science, Victoria University of
Wellington, Wellington, New Zealand e-mail: neil.dodgson@vuw.ac.nz
yellow
primary
red
primary
blue
primary
green
secondary
orange
secondary
purple
secondary
Fig. 1. An Itten colour wheel with twelve hues. The three primaries, red,
yellow, and blue, combine to make three secondaries, green, orange,
and purple. Each primary combines with its neighbouring secondaries
to make six tertiary colours.
```
(a) (b) (c)
```
```
(d) (e) (f )
```
```
Fig. 2. The artist’s harmonious colour combinations: (a) complementary,
```
```
(b) split complementary, (c) triadic, (d) tetradic rectangle, (e) tetradic
```
```
square, (f) analagous. (b)–(e) are from Itten [Itt70, Figs. 54, 55].
```
and five principal colours [Ble12, p.31] and which have a
well-defined notation for describing colours around the hue
wheel.
One of the reasons to question the received wisdom
is that almost all art texts, inspired ultimately by Itten’s
seminal work [Itt70], use angles on the colour wheel to
```
determine “harmonious” colour combinations (Figure 2). If
```
What is the ‘opposite’ of ‘blue’?
the language of colour wheels
Neil A. Dodgson
```
pre-print of a paper in Journal of Perceptual Imaging 2(1), Jan-Jun 2019
```
©2019 Society for Imaging Science & Technology
```
https://doi.org/10.2352/J.Percept.Imaging.2019.2.1.010401
```
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 2
Fig. 3. An NCS colour wheel with four principal hues [HST96] [NCS18]
[Swe89]. The four principals are red, yellow, green, and blue. The
circle is divided into 400 units, 100 between each pair of principals.
Hues between the principals are indicated by numeral between the two
principals’ initial letters. In this chart we see units every ten steps for
each of the four quadrants.
the colour wheel is not immutable, as the different colour
wheels suggest, then these harmonies rest on insecure foun-
dations. This is by no means a new problem [Ber81, Ch.6B]
[Bri07]. Some of the difference between the different colour
wheels can be explained from the principles underlying
their constructions and the uses for which they are designed.
There is difference in how you construct your colour space
depending on whether you are mixing coloured lights,
mixing coloured pigments, or dealing with human visual
perception [Der91]. For example, Itten’s artist’s colour wheel
```
is based in subtractive colour mixing of pigments; opponent
```
```
colour theory is based in visual perception; and Munsell
```
was aiming to bring clarity to colour communication by
establishing an orderly system for accurately identifying
all colours. All the colour spaces discussed in this paper
are ways of specifying or mixing colours so all can be
considered ways of dealing with pigment.
The contribution of this paper is to argue that our under-
standing of colour wheels is mediated by the terms we use
to describe colours, in particular in the use of basic colour
terms [BK69]. This leads to some of the apparent differences
between colour wheels in two ways. First, generally across
all colour wheels, we use the same basic colour name, such
as blue, to represent subtly different colours in different
```
wheels (Section 5), which confuses the student. Second, and
```
```
specific to the artist’s colour wheel (Figure 1), while the
```
```
artist’s (RYB) and printer’s (CMY) colour wheels should
```
both be identical, because they are both subtractive colour
mixing models, I argue that the differences between them
are largely owing to the artist’s colour wheel being actively
driven by basic colour terms in a way that puts it at odds
with the optimal physical colour mixing embodied in the
```
printer’s colour wheel (Section 6).
```
10Y
5GY
10GY
5G
10G
5BG
10BG
5B
10B5PB10PB
5P
10P
5RP
10RP
5R
10R
5YR
10YR5Y
Fig. 4. A Munsell colour wheel with five principal hues and five inter-
mediate hues [Mun76] [Mun18]. The five principal hues are red, yellow,
green, blue and purple. The intermediates are indicated by combinations
```
of the colour letters (e.g., YR=yellow-red). The wheel is further subdi-
```
vided into ten sections for each principal and intermediate, indicated by
numerals. In this chart we see the 5 and 10 units for each of the ten
sections. The “5” unit is the prototypical version of each hue. The “10”
unit is a half-and-half mix of the hues either side. Image used under a
Creative Commons 3.0 license from WikiMedia author Thenoizz.
I first give a summary of the history of colour spaces and
```
colour wheels (Section 2), then a history of colour naming
```
and an outline of Berlin and Kay’s theory of basic colour
```
terms (Section 3). I describe five of the most commonly
```
```
used colour wheels (Section 4). I demonstrate that impre-
```
cise use of colour names explains a substantial amount of
the apparent inconsistencies between the different wheels
```
(Section 5), allowing us to reconcile these differences. This
```
leads to the observation that the technical colour wheels
are broadly consistent with one another, provided we are
precise about our specification of the principal colours in
those spaces, but that the standard artist’s colour wheel
is substantially different from the technical colour wheels
```
(Section 6), because its primary and secondary colours are
```
so strongly related to use of basic colour terms in English.
2 HISTORY
Colour has fascinated philosophers and artists since antiq-
uity but it is only in the last century that we have come to
understand the psychophysical and biological mechanisms
of colour vision, so early writers could be said to be working
in the dark. Aristotle described seven principal colours
```
(white, yellow, red, violet, green, dark blue, black) which
```
he considered all to be mixes of white and black [Sha94], a
misconception that started to be challenged in the fifteenth
century [Alb66] but still held some sway until the eighteenth
century. The discovery that red, yellow and blue are the
artist’s primaries was made in the early seventeenth century.
Shapiro cites Parkhurst and Gage as reporting that four
scholars independently discovered the artist’s tri-chromatic
primaries. All four scholars were conversant with both art
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 3
and the natural sciences, giving them access to the under-
standings needed to make this discovery. Shapiro asserts
that it “. . . was the most important discovery in colour
before Newton’s own theory” [Sha94, p.624].
In the late seventeenth century, Newton conducted ex-
tensive investigations into the nature of colour, discovering
that white light split into an infinite range of colours: the vi-
sual spectrum. This discovery was at odds with the widely-
held belief that white was “pure” and could not be split
and also at odds with the three primary colours discovered
earlier that century, discrepancies that caused him much
trouble to attempt to reconcile and which led to substantial
challenges in his work being accepted. Neverthless, in his
writings before Opticks, whenever he listed his principal
colours of the spectrum, he always added some phrase
such as “with their innumerable intermediate gradations”
to indicate that there were countless discernible colours, but
in Opticks he omits to say this in all but one place, possibly
in an attempt to placate his critics [Sha94, p.619]. Newton’s
early work described five principal colours: red, yellow,
green, blue and purple, but he later added orange and
indigo, leading to English’s current seven-colour rainbow
```
(see longer discussion in the Appendix).
```
At the start of the nineteenth century, Goethe launched
a challenge on Newton’s purely physical approach, tackling
colour instead as a perceptual phenomenon. To a technically
trained modern, some of Goethe’s arguments can seem mis-
guided when compared with Newton’s empiricism. But
Newton was, in his own way, blinkered: fitting the data to
suit his hypothesis rather than the other way round [Pla06]
[Rib85]. The challenge Newton faced was that his evidence
was inconsistent, because he was assuming that mixing
```
lights (additive colour mixing) and mixing pigments (sub-
```
```
tractive colour mixing) should produce consistent results.
```
It was only in 1852 that Helmholtz deduced that different
rules apply to the mixing of pigments and of lights [Sha94].
In additive colour mixing, different coloured lights are used,
each with its own spectrum. The mix of the lights is a
spectrum that is the weighted sum of the spectra of the
individual lights, weighted by the intensity of the lights.
Additive colour is used in display devices and the usual
primary colours used are a red, a green, and a blue. This is
in contrast to subtractive colour mixing, in which coloured
pigments, inks, paints or dyes are mixed together. Each
pigment absorbs some part of the spectrum of light. The mix
of pigments absorbs a weighted sum of the absorptions of
the individual pigments. Subtractive colour mixing is used
in painting, printing and dyeing [Ber81].
The chemist, Chevreul, dyemaster at the Gobelin work in
Paris, published De la Loi du Contraste Simultan´e des Couleurs
et de l’Assortiment des Objets Coloris in 1839 [Itt70]. This, and
other emerging colour theories, had substantial influence
on artists in the nineteenth and early twentieth centuries.
Itten says that “Delacroix. . . is the founder of the tendency,
among modern artists, to construct works upon logical, ob-
jective colour principles, so achieving a heightened degree
of order and truth.” [Fry06, p.418]. The Impressionists and
Post-Impressionists, in particular, used theories of colour
contrast and optical colour mixing.
Several early commentators on colour, including da
Vinci, noted that there appear to be four fundamental
```
colours: red, yellow, green and blue, in addition to black
```
and white [Har06]. Hering formalised this into the opponent
theory of colour vision [Der91] [HJ57]. Hering’s theory was
further developed by H˚ard, Sivik and Tonnquist in their
```
creation of the Natural Colour System (NCS) [HST96]. There
```
is evidence that the four opponent principal colours are
physiologically determined [Gou91] [Har05]. Hering’s the-
ory was not widely embraced at the time because there was
no understanding of how responses to two different colours
of light could interact to create a colour-opponent signal. We
know today that the neurons in the retina process the out-
puts of the light-sensitive cones to produce three channels
of data to the brain: a high resolution luminance channel,
a lower-resolution red-green channel and an even lower-
resolution blue-yellow channel [Ber81, p.16] [HJ57]. The
opponent colour channels explain well several features of
human vision, including the way in which colour blindness
manifests and the complementary afterimages caused after
fixating on a coloured field. Consistent with this theory is
that you cannot perceive a colour as having simultaneously
components from either end of an axis, so a yellowish-green
and a bluish-green both make sense, but a human can never
perceive a colour that is “reddish-green”, such a mixture
being a nonsense.
Over far more than a century, philosophers, scientists
and artists have grappled with ways to represent and under-
stand colour, leading to many systems of colour representa-
tion. Basic introductions can be found in computer graphics
and design texts [FvDFH90, Ch.13] [JMF94] [SAM09, Ch.20–
22] [Sto03], with more detailed explanations in specialist
texts [Ber81] [Ble12] [Bri07] [KB96], and a full history of
colour spaces in Kuehni and Schwartz’s 2008 book [KS08].
A colour space is a three-dimensional representation
of colour. We can restrict ourselves to three dimensions
because the human visual system has three types of receptor
for colour vision. All of the colour spaces are mathematical
transformations of one another. Hunter gives a detailed
history of nineteen colour spaces developed in the attempt
to create a perceptually uniform space, starting with the CIE
1931 colour space and Munsell’s original system, through
to the CIELUV and CIELAB systems of 1976 [Hun75,
Ch.8]. Derefeldt gives the background of the most impor-
tant colour appearance systems, including Munsell, NCS,
CIELAB and CIELUV. She gives their basic attributes, and
the principles for scaling and notation of the variables. In
particular, she makes a comparison of the hue spacing of
the different spaces [Der91]. Note that there is considerable
evidence that colour vision is non-Euclidean, so any colour
space is not going to be a metric space, perceptually [Ber81,
p.64]. For example, the CIELAB system has a cube-root
relationship with the signals that are received by the cones
in the human eye. This is to better match the perceptual
response of the human visual system but means that linear
mixes in the CIELAB system do not necessarily match mixes
of pigments.
A colour wheel is a representation of one dimension
of a colour space: hue. Colour wheels have been used
for centuries. The earliest known drawing of a colour
wheel dates from 1611 [PF82], a century before Newton’s
Opticks [New04].
A colour wheel or, more accurately, a hue wheel, is a
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 4
circle that passes through all of the spectral colours and then
through the purples to join the two ends of the spectrum
```
(Figure 1). Hue is explicitly one of the three dimensions in
```
```
some colour systems, including NCS (Figure 3) and Munsell
```
```
(Figure 4), and is implicit in others, where hue is a function
```
of two or three of the principal dimensions of the space.
```
For example, in the case of CIELAB, h◦ = tan−1(b∗/a∗).
```
When considering a colour wheel, the hues always appear
in the same order around the wheel but they differ in which
hues appear opposite each other and in the relative angular
separation of pairs of hues.
A student may make an assumption that a “true” colour
wheel exists and that the different colour wheels essentially
stretch or contract sections of the “true” wheel to fit their
predilections, as if the colours were painted on a rubber
bicycle wheel and we nailed certain hues to certain points
on the rim. The stretching and contracting is epitomised
in the differences in the angles red–yellow and green–blue,
shown in Table 1. When a colour wheel is used as a mech-
anism to describe hue, then such stretching or contracting is
```
fair: the wheel is not purporting to show precise physical
```
relationships. However, when a colour wheel is used to
describe relationships or mixes between distant hues, such
as in defining the “opposite” of a hue or “harmonious
```
colour combinations” (Figure 2), then this stretching and
```
contracting becomes questionable.
3 BASIC COLOUR TERMS
Berlin and Kay proposed the theory that there are basic
colour terms in all languages [BK69]. These are the terms
that you teach small children and which produce categories
of colour that are irreducible, that is, all other colour terms
are considered, by most speakers of the language, to be
variations on these basic colour terms.
In antiquity, classical scholars certainly privileged certain
colours above others. In the distant past, the fundamental
colours appear to have been severely limited. Berlin and
Kay quote Geiger as suggesting that “Democritus and the
Pythagoreans [fifth century BC] assumed four fundamen-
tal colours, black, white, red and yellow” [BK69, p.136].
Elsewhere, Geiger comments that Aristotle [fourth century
BC] “in his ‘Meteorology’ calls [the rainbow] tri-coloured,
viz., red, yellow, and green” [Gei80, p.57]. By the fifteenth
century, things had developed a little further. Alberti cites
three fundamental colours: red, green, blue, combined with
grey [Alb66, Book I, paragraph 9] while da Vinci lists what
we now call the colour opponent set of principal colours:
red, yellow, green, blue [Har06]. In the seventeenth century,
Boyle listed the standard artist’s primaries: red, yellow and
blue [Har06], but added green and purple when actually
conducting his experiments on colour [Boy64, p.187]. In
the early eighteenth century, Newton started with these
five principal colours: red, yellow, green, blue and purple,
```
then added orange and indigo (see longer discussion in the
```
```
Appendix).
```
There is a question of nature versus nurture: how much
the colour categories are inherent in our psychophysiology
and how much they are cultural constructs. There is good
evidence that black, white, yellow, red, blue, and green are
strongly tied to the perceptual mechanisms in the human
brain [Har05]. Hardin notes that the four principal colours
```
(yellow, red, blue, green) “. . . prove to be both necessary and
```
sufficient for an English speaker to describe any spectral
stimulus” [Har98]. The other basic colour categories may
be more culturally determined. Children are able to match
and discriminate colours long before they have consistently
codified the boundaries in colour space of the basic colour
terms, so providing evidence that the boundaries are a
social construct [ATF86]. In any case, in order to commu-
nicate clearly between members of a language group, the
learnt categories must be at least partly a social construct,
reinforced by parents, kindergartens and primary schools
because all members of the language group broadly agree
on them.
Berlin and Kay identified that the number of basic colour
```
terms range between two (representing light and dark
```
```
colours) and twelve, depending on the language. In English
```
there are eleven basic colour terms: red, orange, yellow,
green, blue, purple, pink, brown, black, grey and white.
As an example of the irreducibility of these basic terms,
consider how difficult it is to convince a child that brown
is really “dark orange” or that pink is “light red” [Har98,
p.210]. You may teach a particular child or student to make
finer distinctions, as between “cyan”, “azure”, “indigo” and
“turquoise”, but there is a cultural push towards teaching
and agreeing on the eleven basic colour terms [KB96, Ch.11],
and there is demonstrated effect of these basic categories on
the ability to perform colour discrimination [WWF+07]. The
maximum number of basic colour terms in any langague
appears to be twelve. Russian, and a few other languages,
```
distinguish light blue (Russian goluboy) from dark blue (Rus-
```
```
sian siniy) [Par05]. This paper considers the case of English
```
though most other European languages use the same eleven
categories, which is important to our discussion because
Itten, in particular, was working in German.
Rather than conducting new perceptual experiments,
we are able to make use of results from three previous
studies [BK69] [RDD00] [RH72], which used colour chips
evenly chosen from Munsell’s colour space.
Ignoring the monochrome black, grey and white, there
are eight basic colour terms in English. Roberson et
al. [RDD00] experimented with an array of 160 coloured
chips, evenly spaced within the Munsell colour system,
asking English speaking subjects to categorise each chip into
one of the eight colour categories.
Figure 5 shows the mean colour chosen by subjects for
each colour chip. In addition, each colour region contains a
small cross that marks the “best-example choice” for each
of the eight colours, as described by Rosch [RH72]. Notice
the difference in sizes of the different colour terms: orange
```
(5.5 cells), yellow (6.5 cells) and brown (9 cells) each take
```
up only a small part of the colour space compared with
```
green (52.5 cells) and blue (36 cells). While I acknowledge
```
that Munsell’s colour space is non-uniform and is somewhat
compressed in the yellow-red area and expanded in the
blue-green area, that cannot explain the full magnitude of
this difference. Over 50% of the chart is categorised as one
```
of two terms blue and green; by contrast, red, orange and
```
```
yellow between them take up just 14% of the chart (see
```
also Hardin’s comments on the relatively small sizes of the
“warm” colours’ regions compared with the relatively large
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 5
5R 10R 5YR 10YR 5Y 10Y 5GY 10GY 5G 10G 5BG 10BG 5B 10B 5PB 10PB 5P 10P 5RP 10RP
9
8
7
6
5
4
3
2
yellow
orange
brown
red red
purple
bluegreen
pink
pink
```
Fig. 5. Roberson, Davies and Davidoff’s diagram of the eight basic colours in English (redrawn from [RDD00, Fig.1a]). The colour space is that of
```
```
the Munsell colour system, which has five principal colours, red (R), yellow (Y), green (G), blue (B), purple (P), and their various combinations along
```
```
the horizontal axis, with brightness on the vertical axis (2=dark, 9=light). See Figure 4 for an explanation of the notation. The experiments used a
```
160 chip Munsell array and the array shows, for each of the 160 cells, the mean colour chosen by English speakers for each colour chip. Some
cells lie on the boundary, in which case the boundary passes through the centre of the cell. The small crosses mark the “best-example choices”
for each of the eight colours, as described by Rosch [RH72]. The colour of each area matches that best-example choice, within the limits of the
```
available gamut. The “best-example choices” are taken directly from Rosch’s 1972 paper [RH72]; the locations of several of these “best examples”
```
are placed incorrectly in Roberson et al’s 2000 paper [RDD00, Fig.1a].
5R 10R 5YR 10YR 5Y 10Y 5GY 10GY 5G 10G 5BG 10BG 5B 10B 5PB 10PB 5P 10P 5RP 10RP
9
8
7
6
5
4
3
2
yellow
orange
brown
red purple
bluegreen
pink
```
Fig. 6. Berlin and Kay’s diagram of the eight basic colours in English (redrawn from [BK69, Appendix I, p.119]). As in Figure 5, the colour space
```
is that of the Munsell colour system. See Figure 4 for an explanation of the notation. Berlin and Kay used a 320 chip Munsell array. They asked
```
participants to determine, for each basic colour term, x, (1) all those colour chips which they would, under any conditions, call x, and (2) the best,
```
most-typical examples of x. The small crosses mark the locations of the “best, most-typical example” for each colour. The colour of each area
matches that best most-typical example, within the limits of the available gamut. The white areas represent colour chips that were not given an
unequivocal colour name.
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 6
```
sizes of the “cool” colours’ regions [Har05]). Describing a
```
colour as “red”, “orange” or “yellow” will always give a
colour close to the “best-example choice”, that is, the colour
will be close to what an average person would imagine it to
be. By contrast, describing a colour as “green” or “blue” can
give a colour that is a significant distance from the “best-
example choice”. Hardin discuses the consistency of such
studies, noting that, across the many studies,“No matter
how many basic color terms languages might have, their foci
[“best-example choices”] tend to cluster reliably in relatively
narrow regions of the [Munsell] array, whereas boundaries
are drawn unreliably, with low consistency and consensus
for any language.” [Har98, p.208]. As evidence that there
is consistency between observers, consider that the NCS
colour system is predicated on there being good agreement
between observers on what Berlin and Kay call the “best,
most-typical example” of the four principal colours red,
yellow, green and blue [HST96].
Berlin and Kay undertook a different experiment [BK69],
using a 320 Munsell chip array, in which, for each basic
colour term, they asked English speaking subjects to select
all those chips that they would, under any conditions, cate-
gorise as being of that colour. Figure 6 shows the regions in
which they got an unequivocal response from their subjects.
One important result, for our investigation, from Berlin and
Kay’s work is that both cyan and indigo were unequivocally
described as “blue” by their subjects.
Note that pink and brown do not appear on the standard
colour wheel. Pink is a light variant of red. Brown is a dark
variant of orange. The basic English colour terms along the
visual spectrum are thus red, orange, yellow, green, blue
and purple. Of these, orange is a relatively recent addition
```
to the basic colour terms in English. Red (Old English r´eod),
```
```
yellow (geolu), green (grene) and blue (blaw) are all ancient
```
colour terms. Purple was brought into English, from the
Latin, in the ninth century. Orange, by contrast, was adopted
only in the early sixteenth century. Its first attested use as a
colour name was in 1512. Prior to this it had been known
```
as yellow-red (Old English geolur´eod). It is unclear when
```
orange became a basic colour term in English, but it is a
possibility that Newton’s description of the spectrum was
an influence. Similarly, in German, gelb, rot, blau, and gr ¨un
are ancient terms with words for orange and purple being
more recent [Jon13].
4 THE COLOUR WHEELS
Figure 7 illustrates the principal colours of five colour
wheels in common use. It is immediately obvious that they
do not map linearly to one another. The colour that is dia-
```
metrically opposite to blue ranges from yellow (Fig. 7(a),(c))
```
```
through orange (Fig. 7(b),(d)) to a red-orange (Fig. 7(e),
```
```
but see also the Appendix). I briefly describe each of the
```
five colour spaces, including the purposes for which it was
designed and the principal colours it uses.
```
4.1 Opponent colour spaces, RYGB, Figure 7(a)
```
The opponent colour spaces are based on the perceptual op-
ponent colours of Hering. The opponent principal colours,
RYGB, are used in the CIELAB colour space [Ber81, p.67],
which is designed to be a reasonably uniform space, per-
```
ceptually (see Section 2), and in the Natural Colour System
```
```
(NCS) [HST96] [Ber81, p.39] [Fai05, p.99] [NCS18] [Swe89]
```
```
(Figure 3), which is designed for specifying colour in a
```
similar manner to Munsell’s colour system but, in the case
of NCS, using the observer’s in-built understanding of what
is meant by a “pure” red, yellow, green, blue, black and
white [NCS18]. Derefeldt notes that “The development of
the NCS began by psychometric testing of Hering’s con-
ceptual framework having observers estimate qualitative
colour attributes by assuming that observers could imagine
six elementary colours by means of verbal definitions only.
These imaginary colours, which constitute cognitive, natural
reference points, were used as references in absolute judg-
ments without any physical representation of the references.
. . . The definitions of the six elementary colours. . . follow
Hering’s definitions of primary colours closely.” [Der91,
p.234].
Both CIELAB and NCS are used for specifying colour
rather than purporting to represent colour mixing. Because
CIELAB is non-linear, a linear mix in CIELAB space will not
necessarily create the same colour as mixing matching pig-
ments. Because NCS is entirely perceptual, there is, again, no
guarantee that a linear mix of two NCS colours will match
the mix of two pigments. The principal colours, RYGB, are
four of Berlin and Kay basic colour terms.
```
4.2 Munsell colour system, RYGBP, Figure 7(b)
```
The five principal colours in this space are those used by
Boyle in his seventeenth century colour experiments [Boy64,
p.187] and are the original five colours of the rainbow spec-
ified by Newton. Munsell formalised this in the early twen-
tieth century, using the “. . . guiding principal of equality of
visual spacing” [Ber81, p.36]. The colour space was designed
to aid in colour specification, originally for schoolchildren.
The specific colours of the five principal hues were deter-
mined visually. Munsell’s colour order system was exten-
```
sively reworked (“renotated”) in the 1940s by the Optical
```
Society of America. This was a painstaking process of mea-
suring the discriminability of the colors and adjusting the
spacing of the colours to optimize them for use in science
and industry [Mun76] [Mun18]. It should be made clear that
Munsell’s space is not a uniform colour space: small steps
should be roughly equal visually but large steps cannot be
compared. Berns implies that having five principal hues
leads to greater visual equality between neighbouring hues
than a system based on the four principal unique hues of
red, green, yellow, and blue [Ber81], though Kaiser and
Boynton suggest that there is evidence that the Munsell
principal hues are not necessarily spaced evenly perceptu-
ally, in particular that P and PB are too far apart [KB96,
p.494]. All five principal hues are Berlin and Kay basic
colour terms.
```
4.3 Printer’s colour wheel, RYGCBM, Figure 7(c)
```
This is the most pragmatic of the colour wheels, relat-
ing directly to how printing works. The colour space is
explicitly designed for colour mixing. The three principal
colours, cyan, magenta and yellow, are the primaries of
subtractive colour mixing, as used in printing. Each primary
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 7
R
BP
Y
G
R
B
Y
G
P
O
Y
G
RB
R
B
Y
G
CM
```
(a)(b)(c)(d)(e)
```
I
R
V
O
Y
G
B
Fig. 7. Representations of the principal colours of five colour wheels, as they might be constructed by a student. All colours are represented by
their initial letter: Red, Orange, Yellow, Green, Cyan, Blue, Indigo, Purple, Violet, Magenta. All colour names are taken at face value. Left to right:
```
(a) colour opponent theory, with four principal colours, RYGB; (b) Munsell’s colour system with five principal colours, RYGBP; (c) the printer’s colour
```
```
wheel with the three subtractive primaries for colour printing CMY and their three secondaries RGB, RYGCBM; (d) the artist’s colour wheel with
```
```
the three painting primaries RYB and the three secondaries OGP, ROYGBP; (e) Newton’s colour wheel, with the seven colours of the rainbow,
```
```
ROYGBIV, notice that Newton’s colours are not evenly spaced round the wheel (see Appendix).
```
is physically realised as a pigment that absorbs certain
wavelengths of light. When two primaries are mixed or
superimposed, the mixture absorbs the wavelengths that
are absorbed by each pigment in proportion to the amounts
of each primary mixed. The specific primaries chosen are
pigments that, when mixed, allow production of a large
gamut of colours. Good choices for primaries, that produce
close to the largest gamut achievable with three pigments,
are broadband yellow, broadband cyan, and broadband ma-
```
genta (see Section 6). Mixing each pair of primaries produces
```
the three secondaries, which are called red, green and blue,
although these turn out to be rather imprecise descriptions
```
(see Section 5.6). While four of these six colours are Berlin
```
and Kay basic colour terms, it is important to our discussion
that cyan and magenta are not. As a consequence, cyan
and magenta are relatively precise terms, and each is well-
localised in colour space compared to say, blue or green.
```
4.4 Artist’s colour wheel, ROYGBP, Figure 7(d)
```
```
This is the wheel that Itten exemplified (Figure 1) [Itt70].
```
This colour wheel has been known for over two centuries,
but Itten’s work in the 1950s and ’60s pushed it to preem-
inence. Prior to Itten, other colour wheels had been used
in art teaching. For example, an opponent-colour system
designed by Wilhelm Ostwald was used in British art educa-
tion between the two world wars, in which the colour wheel
had four principal colours, though Ostwald used a bluish-
green opposite red [Bri07, Sec.7.3] rather than the pure green
used by NCS and Hering. Itten, by contrast, designed his
colour wheel on the foundations that there must be three
primaries and that diametrically-opposite colours must mix
to grey [Itt70, p.21]. Briggs comments on how pervasive
Itten’s influence has become: “Itten’s book [The Art of Colour
```
(1961)] has been so influential that it defines the limits of
```
artistic colour theory for the majority of sources on the
internet today. . . As a result of its half century of ascendancy,
many artists today assume that traditional colour theory
has dominated art education continuously since its origins,
and assume modern colour theory is a very recent intru-
sion” [Bri07, Sec.11.3]. Itten himself developed the concepts
```
of harmonious combinations of colour (Figure 2), which
```
are specified by precise angular relationships around the
colour wheel. The artist’s colour wheel is used to help artists
understand colour relationships and colour mixing. Red,
```
yellow and blue are the primary colours (in which primary
```
is used in the same sense as in the printer’s colour wheel,
```
Section 4.3), mixing to make the three secondaries: orange,
```
green and purple. All six of the primary and secondary
```
colours are Berlin and Kay basic colour terms (see Section 6
```
```
for a discussion of the implications of this).
```
```
4.5 Newton’s rainbow, ROYGBIV, Figure 7(e)
```
This is the prototypical early colour wheel, from when
evidence was beginning to be gathered about how coloured
light and colour mixing worked. It is misguided in several
```
respects (see the Appendix). Newton originally described
```
the rainbow as having five colours, the same five that Mun-
sell used two centuries later, but Newton quickly adopted
```
two extra colours (orange and indigo) to make the seven
```
colour rainbow that is taught in all English-language pri-
mary schools. His colour wheel is not evenly spaced and
his use of the terms “blue” and “indigo” do not match
their modern uses but this colour wheel has gained almost
unstoppable traction in English education about colour, to
the confusion of many students. Newton’s rainbow has the
same colours as the artist’s colour wheel plus indigo.
5 RECONCILING THE DIFFERENT COLOUR WHEELS
Consider the structure of the various colour wheels as a
```
student would view them. Figure 7(a)–(d) shows the result
```
if you place the principal colours evenly spaced around
the wheel, as they are in all diagrams in the student’s text
```
books (e.g., Figures 1, 3, 4). Table 1 tabulates the angle a
```
student would measure between red and yellow and that
between green and blue. The red-yellow angle varies from
```
60◦ (Figure 7(c)) to 120◦ (Figure 7(d)), while the green-blue
```
```
angle varies from 120◦ (Figure 7(c)) to 60◦ (Figure 7(d)). In a
```
non-metric space, these angles are, at best, approximate, but
a student will still worry about why the angular distances
around the wheels differ so markedly, especially if they
have been trained to build the harmonious colour combi-
nations of Figure 2, which explicitly require consideration
of angle. They will also be concerned to understand why
diametrically-opposite colour pairs differ between colour
spaces.
5.1 What is meant by “opposite”?
Let us return to the question “what is the opposite of
blue?”. The discussion above has implicitly assumed that
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 8
TABLE 1
The first four colour wheels from Figure 7, showing the differences in
angle between the pairs red-yellow and blue-green, and giving the
opposite colours to red and blue.
red- blue- opposite opposite
Colour wheel yellow green of red of blue
```
Opponent (RYGB) 90◦ 90◦ green yellow
```
```
Munsell (RYGBP) 72◦ 72◦ blue-green yellow-red
```
```
Printer’s (RYGCBM) 60◦ 120◦ cyan yellow
```
```
Artist’s (ROYGBP) 120◦ 60◦ green orange
```
the “opposite” of a given hue is the hue that is on the
opposite side of a diameter through the centre of a colour
wheel. There are at least three other useful definitions of
opposite [Fry06] [Har06].
• Additive complementaries: two coloured lights that,
when mixed, give white.
• Subtractive complementaries: two pigments that, when
mixed together, produce a grey. In theory, oppo-
```
sites on the artist’s and printer’s colour wheels (Fig-
```
```
ure 7(c) and (d)) should do this.
```
• Perceptual complementaries: a colour’s opposite is the
colour perceived as an afterimage after fixating on
the first colour for a significant period of time.
As Harkness shows [Har06], these each give slightly differ-
ent opposites for any given colour. For example, fixating on
Itten’s red and then looking away will give a blue-green
sensation rather than to the green of the artist’s colour
wheel [Bri07, Sec.11.3]. So the word “opposite” needs to
be defined carefully in order to give a clear answer to
our question. This means that we should not expect the
Munsell or opponent-colour wheels to have the same colour
diametrically opposite blue as do the printer’s or artist’s
colour wheels, because the Munsell and opponent-colour
colour spaces were not designed using criteria by which op-
posite colours necessarily represent complementary colours.
Indeed, these colour spaces are non-linear spaces and there-
fore attempts to use them for accurate colour mixing will
fail.
However, we would expect the printer’s and artist’s
colour wheels to have the same diagonally-opposed colours,
because they are both constructed by the same principle
of subtractive complementarity. We find that they do not:
the diagonal opposite of blue is yellow in the printer’s
colour wheel and orange in the artist’s. As the definition
of “opposite” is the same in these two wheels, we must
consider the definition of “blue”.
5.2 What is meant by “blue”?
When asked to imagine a blue, the average person will
choose a colour close to the “best, most-typical example”
at 10B/4.5. But when asked if a particular colour is “blue”,
the answer is “yes” for a range from cyan through to indigo
```
(Figure 6). “Blue” can refer to any spectral colour from about
```
```
490nm (a greenish-blue, cyan) to 450nm (a purplish-blue,
```
```
indigo). What we mean by “blue” changes the answers to
```
questions about that colour. As Itten says, “unless our color
names correspond to precise ideas, no useful discussion of
color is possible” [Itt70, p.30].
yellow
primary
magenta
primary
cyan
primary
green
secondary
red
secondary
blue
secondary
Fig. 8. Mixing real primary inks to produce the three secondaries.
Inner ring: primary colour toners mixed on a colour laser printer [Fuji
Xerox FX ApeosPort-IV C3375 v3018.103 PS]. Outer ring: primary fluid
acrylic paints mixed with a paintbrush [paints from Golden Artist Col-
```
ors, Inc: Primary Cyan (pigments PW6/PB15:4/Titanium White/Phthalo
```
```
Blue(GS)), Primary Magenta (pigment PV19/Quinacridone), Primary
```
```
Yellow (pigments PY3/PY73/PW6/Hansa Yellow Light/Hansa Yellow
```
```
Medium/Titanium White)].
```
The answer to “what is the opposite of blue?” depends
both on what you mean by “opposite” and on what you
mean by “blue”. Some of the differences in the “opposite
of blue” column in Table 1 are owing to differences in the
meaning of “opposite” and some are explained by the word
“blue” refering to different hues in the different cases.
5.3 Imprecision in colour naming
More generally than blue, we find that the colour names
are imprecise in several cases in our various colour wheels,
where the actual principal colour used in the colour system
does not match the “best most-typical” example of that
colour name. If we consider the colours by how they actu-
ally appear, rather than by their basic colour names, we find
that it is possible to reconcile a great deal of the apparent
differences between the wheels.
Consider the colour wheels in light of the linguistic
ambiguity inherent in the colour names and in terms of the
true appearance of each colour. In Figure 7, we assumed,
as a student might, that each colour represented the “best,
most-typical example” of that colour, marked by the crosses
in Figure 5. Figure 9 redraws those diagrams to reflect the
actual colour that is represented by each of the general
colour terms. We consider each wheel in turn.
```
5.4 Opponent systems (CIELAB and NCS), RYGB
```
```
In the standard CIELAB system (Figure 9(a)), yellow and
```
blue match their best, most-typical examples, but red and
```
green do not. CIELAB red is a purplish-red; CIELAB green
```
is a cyanish-green [Har06].
```
By contrast, in the Natural Colour System (NCS), the
```
four principal colours all do match their best, most-typical
```
examples (Figure 9(f)) because NCS is defined explicitly in
```
terms of the colours that an observer would consider to be
“pure” red, yellow, green and blue [HST96, p.181] [NCS18].
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 9
P
Y
RcG
cB
B
Y
R
G
B
Y
pRcG
B
Y
RG
B
Y
R
G
B
Y
RG
RP
Y
pB
oR
C
B
Y
R
G
G
P
O
B
R
G
B
Y
R
G Y
rP
O
B
RG
C
B
Y
R
G Y
```
(a) (b)
```
```
(c) (d)
```
```
(e) (f )
```
```
Fig. 9. The colour wheels of Figure 7(a)–(d) and Figure 11(b) redrawn
```
to reflect the actual colour represented by each of the principal colour
names. An uppercase letter represents the same colour as in Figure 7, a
lowercase letter indicates a colour modifier, with “-ish” added to the end
```
of the colour name; for example, oR is “orangish-red”. Inside each wheel
```
are labels for the actual colours represented by each coloured disc.
Outside each wheel are the approximate locations of the best, most-
typical examples of Red, Yellow, Green, Blue. The thick arc indicates
the green-blue angle. The thick dotted arc indicates the red-yellow angle.
```
The six colour wheels are: (a) CIELAB, one variant of RYGB; (b) Mun-
```
```
sell’s RYGBP; (c) the printer’s colour wheel, RYGCBM; (d) the artist’s
```
```
colour wheel, ROYGBP; (e) Newton’s ROYGCBV where we have used
```
the correct angles from Figure 10 and applied the colour corrections
```
discussed in the Appendix; (f) NCS, a second variant of RYGB in which
```
the colour names match their best, most-typical examples of that colour.
5.5 Munsell, RYGBP
Both the principal green and the principal blue have a
```
cyanish cast to them (Figure 9(b)), so true green and true
```
blue are closer to yellow and purple respectively.
5.6 Printer’s, RYGCBM
```
To assess the printer’s colour wheel (Figure 9(c)), consider
```
the colours in Figure 8. This shows two different exam-
ple sets of CMY inks mixed to make two sets of RGB
secondaries. Note the consistency between the two sets of
secondaries. Here “green” is close to the “best, most-typical”
green, but “red” is an orangish-red, rather than the “best,
most-typical example” of a red, and “blue” is far removed
from “best most-typical”, being a deep purplish-blue: an
indigo. So, although these secondaries are informally called
“red” and “blue”, they are not sitting at the positions in
colour space that the average observer would call the “best
most-typical example” of those colour names.
5.7 Artist’s, ROYGBP
Following Itten [Itt70], the artist’s principal colours match
their “best, most-typical” examples, by definition, because,
in the absence of any other concept, the student will use
their internal linguistic definition of the colour to ensure
that their red is neither shading towards yellow nor shading
```
towards blue, and likewise for all the other colours (see
```
```
Section 6).
```
5.8 Discussion
Consider the six revised wheels of Figure 9. Here, I have
indicated the actual hue of each of the principal colours and
indicated an approximate location for the “best most-typical
examples” of yellow, red, blue and green. In particular,
compare the approximate locations of those four colours
between the six wheels and compare the lengths of the
arcs between red and yellow and between green and blue,
though recall that CIELAB, Munsell, Newton and NCS are
not metric spaces and so the angles subtended by these arcs
give only an approximate indication of the actual distance
between two colours.
```
We find that CIELAB (Figure 9(a)), Munsell (Figure 9(b)),
```
```
and the printer’s colour wheel (Figure 9(c)) are now all
```
very similar. Our linguistic adjustments push all three of
these colour spaces close enough to one another that we
can see that they are describing much the same thing.
```
Newton’s ROYGCBV (Figure 9(e) and Appendix) is a little
```
distorted, with a larger red-yellow angle than those three
colour wheels, emphasising the role of orange, but this was
an early attempt at a colour system so we can accept it as a
rough approximation. We include it because of its continu-
ing influence on children’s education about colour. The NCS
```
opponent colour system (Figure 9(f)) is distorted further, but
```
it is designed for colour specification not for colour mixing
and it is known to be perceptually uneven: there are more
visually distinct hues between red and blue than between
yellow and green [Fai05, p.100]. The outlier is the artist’s
```
colour wheel (Figure 9(d)) where the red-yellow section is
```
clearly expanded and the blue-green section compressed
compared with all the other wheels.
6 WHY IS THE ARTIST’S WHEEL DIFFERENT?
In theory, the artist’s RYB and the printer’s CMY colour
wheels should be identical. Both purport to have primaries
that cannot be made by mixing other colours. Both purport
to be able to create all hues from the three primaries.
Both purport to have diametrically-opposite colours that
mix to make grey. However, the CMY colour wheel is
demonstrably the correct way to do this, given that these are
the colours used in the vast majority of commercial colour
printing processes. The underlying theory is that each of
the primaries theoretically absorbs exactly one third of the
visual spectrum. Berns [Ber81, Ch.6], for example, suggests
splitting the spectrum into thirds at 500 nm and 600 nm.
A theoretical cyan ink absorbs all red and orange light.
A theoretical magenta ink absorbs all yellow and green
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 10
light. A theoretical yellow ink absorbs all blue and violet
light. Combinations of these three primaries can produce
any hue. In practice, the spectra of the three inks are not
perfect squares [Ber81, pp.154–5] [Kip01, Figs.1.4-20,-22], so
the range of colours achievable is not as broad as would
be possible with perfect theoretical primaries, but we can
manufacture inks of sufficient quality to satisfy the vast
majority of our printing needs.
The dramatic difference between the theoretically-correct
CMY colour wheel and the artist’s RYB colour wheel can
be explained by considering the mechanism by which the
artist’s colours are chosen. In Itten’s seminal writing on the
colour wheel [Itt70], he writes: “. . . a person with normal
```
vision can identify a red that is neither bluish, nor yellowish;
```
```
a yellow that is neither greenish, nor reddish; and a blue that
```
is neither greenish, nor reddish. . . The primary colors must
be defined with the greatest possible accuracy.” There is no
freedom here to allow red to be magenta, because magenta
is a red that is distinctly bluish, nor is there freedom to
allow blue to be cyan, because cyan is a blue that is dis-
tinctly greenish. I hypothesise that Itten is placing his three
primaries at or near the “best, most-typical locations” in the
Berlin-Kay sense. Itten then mixes his secondaries, which are
all also Berlin-Kay basic colour terms. So while Itten says
that his hues are “. . . evenly spaced with complementary
colours diametrically opposite each other, ” his even spacing
is in a linguistic sense rather than a physical one.
Note also how Itten defines his red, yellow and blue.
Red is “neither bluish, nor yellowish”, defined relative to
the other two primaries. But yellow and blue are “neither
```
greenish, nor reddish” (emphasis mine), so Itten’s three pri-
```
maries are defined relative to the four principal colours of
opponent-colour theory [Bri07, Sec.11.3]. The NCS colour
system defines its principal colours in exactly the same
way [HST96, p.181], but uses this defining mechanism to
create four principal colours rather than the three primary
```
colours of the artist’s colour wheel (Figure 9(f) cf. 9(d)).
```
By having red and yellow as primaries in the artist’s
colour wheel, orange becomes a natural secondary and,
because it is a basic colour term, it is possible to mix
orange so that, to the artist’s eye, it is neither too reddish
or too yellowish, thereby occupying its “best most-typical”
position in colour space. With blue in the third of the
primary positions, it is obvious from the English Berlin
```
and Kay chart (Figure 5) that the other two secondaries
```
are going to be green and purple, if we wish them to also
be basic colour terms. As with orange, it is possible to
mix these, as Itten says we should, so that they are well-
balanced and not leaning towards the colour on either side,
which I hypothesise places them at the “best most-typical”
positions.
The substantial difference between the artist’s colour
wheel and the other colour wheels would not be a problem
if the artist’s colour wheel, as designed by Itten, were not so
pervasive in education about colour.
The challenge with creating the artist’s colour wheel
is that Itten had two aims that cannot be satisfied simul-
```
taneously: he wants his diametrically-opposed colours to
```
be perfect subtractive complementaries [Itt70, p.20] and he
wants his primary and secondary colours to be mixed “very
carefully” so that, perceptually, they do not “lean towards”
either colour on either side [Itt70, p.29]. The former is
```
achieved correctly by the printer’s colour wheel; the latter
```
pushes the primary and secondary colours to their “best,
most-typical locations” in perceived colour space. The fact
that the printer’s colour wheel and the artist’s colour wheel
are substantially different demonstrates that these two aims
cannot both be satisfied in the same colour wheel1.
The artist’s RYB is thus an approximation to CMY, yet the
artist’s colour wheel remains by far the most popular colour
wheel, outside the technical sphere. This, in spite of the fact
that the printer’s wheel is technically superior for mixing
the widest possible range of colours. We must ask why it is
that a colour wheel that appears technically inferior should
be so tenaciously held. I hypothesise that the artist’s colour
wheel’s success is owing to its use of the six basic colour
terms that correspond to spectral colours: if you are teaching
colour theory to children, you will gravitate towards using
the colour names with which they are most familiar.
One of the challenges in teaching technical printing is
to explain to the student the special role of magenta and
cyan, and to describe what they are in terms of the basic
```
colour terms (“reddish-pink” and “greenish-blue” respec-
```
```
tively). For example, Gleeson, in her text on the illustration
```
of picture books, identifies magenta with red and cyan with
blue [Gle03, p.53], while Cianciolo, writing on the same
topic, twice mentions the four process colours, naming them
as red, yellow, blue and black [Cia76, pp.61,88]. This is not
necessarily a misunderstanding on the author’s part but
```
a need to explain the technical concepts (“magenta” and
```
```
“cyan”) in language that is accessible to the general reader
```
```
(“red” and “blue”).
```
As a framework for teaching colour, RYB does admit
the possibility of using colours other than the “best most-
typical” and artists over the centuries have used a range
of different reds, yellows, and blues as their primaries.
However magenta is outside the red zone in the Berlin
and Kay diagrams. I hypothesise that the untrained ob-
server has a challenge with accepting magenta as a primary,
because it is not intuitively satisfying. Though magenta
is the correct colour for printing, it does not fall at one
of the optimal points in Berlin and Kay’s diagram, being
somewhere between red, pink, and purple. Red is much
more satisfying, being one of the key colours in Hering’s
theory of perception. Yellow, by contrast, is both a primary
and an optimal point in linguistic colour space, so we have
no trouble accepting it. Cyan is a blue but it is not the most
typical blue.
There is a further gloss on the use of RYB. Despite it
being taught to children as a way of “mixing colours”, it
would be extremely unusual for a professional artist to have
just three colours on their palette. Rather, the artist’s colour
wheel is used as a framework within which to understand
colour relationships. This is because it is not possible to
```
achieve all colours by mixing just a red, yellow and blue;
```
and because having a pure hue allows for consistency of
colour not achievable in repeated mixings. For example,
Matisse used a palette of 17 colours, van Gogh 9 colours, and
1. It is possible to create narrowband pigments for opposing colours
in Itten’s scheme, so that the opposing colours mix to grey, but broad-
band pigments for the primaries do not allow coverage of as large a
gamut as CMY.
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 11
Fryer shows an example of his own work with a palette of
14 colours [Fry06, p.419]. And, while the colour harmonies
of Figure 2 are widely taught, any professional artist or
designer will use their own judgment of harmony rather
than slavishly depend on this basic framework. Indeed, Itten
himself says that different students find different combina-
tions harmonious so that there cannot be a general principle
that appeals to all [Itt70, p.23].
7 CONCLUSION
Some of the apparent difference between the colour wheels
can be explained linguistically. The most obvious example
is that we recognise that “blue” has a broad spectrum
of meanings and that the “best, most-typical” blue is an
imprecise approximation to the true colour represented by
the word. In the printer’s colour space, “blue” is an indigo,
in Munsell’s colour space it is tending to cyan, in the NCS
and artist’s colour spaces it is sitting at the “best most-
typical” position, and in the traditional rainbow, ROYGBIV,
it transpires that “blue” was originally used by Newton to
mean “cyan”. But all of these are described informally by the
single term “blue”. Likewise “red” and ”green” are used in
some colour spaces to refer to colours that are not the “best
most-typical” example of the colour.
What can educators conclude from this? Using
commonly-understood terms, like “opposite” or “blue”, to
also have a specific technical meaning leads to problems,
unless one is careful to define those terms to have precise
meaning. When educating students about colour, we need to
be careful to be precise in what we mean when we use terms
like “blue”. In the printing industry, we already have this
precision when talking about the CMY space, because cyan
and magenta are not basic colour terms, so our students
understand them to have precise meanings, and yellow is a
precise term in common usage, because it occupies such a
```
small part of the overall colour space (Figure 5). But terms
```
like red, green, blue and purple all have imprecise meaning
in English and we must be careful to ensure that we are
defining them appropriately.
There is a remaining challenge, which is that the artist’s
colour wheel is at such odds with all of the other colour
wheels and yet is the first colour system that most people
will meet. I hypothesise that one reason for its tenacity is
that it is a convenient approximation that allows educators
to use six of the basic English colour terms in explaining
how colour works.
APPENDIX
NEWTON’S COLOUR WHEEL
Newton’s seven-colour rainbow is pervasive in English-
language education but it is based on shaky foundations.
Newton performed some of the earliest scientific work on
understanding colour. He had access to some of the earliest
optical components that were of good quality and demon-
strated that a prism split white sunlight into a spectrum
of colours. In Newton’s earliest work on this, he names
five colours of the spectrum: red, yellow, green, blue and
violet [Sha94]. In his later work he augments this to seven
```
colours adding orange (a relatively new word in English)
```
```
Fig. 10. Newton’s colour wheel (adapted from [New04, Book I, Part II,
```
```
Plate III, Fig. 11]). Notice that orange and indigo have segments of
```
only 30◦ compared to the 60◦ allocated to the five other colours. The
uppercase letters A − G are intended to correspond to the notes of
the musical scale, with orange and indigo corresponding to semi-tone
intervals. The lowercase letters p − x are at the centres of the seven
```
colour arcs. Notice the blue (t) is directly opposite the boundary (E)
```
between red and orange.
```
and indigo (which was a recently discovered, imported
```
```
dyestuff). The addition of these two colours appears to have
```
been driven by his desire to get the spectrum to agree with
the notes of the musical scale [New04, p.114]. Goethe cri-
tiques Newton for adding orange and indigo and criticises
his musical analogy as an attempt to impose on the colours
a mathematical order they do not in fact have [Rib85].
To get from a linear spectrum to a circular colour wheel
“Newton also notes that purples could be created by com-
bining light from the two ends of the spectrum. . . ” [Wal02,
p.193] so allowing us to join up the two ends into a cir-
cle [Sha94, p.620]. Looking at Newton’s own drawings of
```
his colour wheel (Figure 10), we see an oddity: in order to
```
match the tones and semi-tones of a musical scale, Newton
gives the new colours, orange and indigo, only half as much
space on the wheel as the original five colours. If we take his
colour wheel at face value, we see that the opposite of blue is
the boundary between red and orange. This is significantly
different from any of the modern understandings, where the
opposite of blue lies between orange and yellow.
With regard to his use of the colour indigo, “a careful
reading of Newton’s work indicates that the color that he
```
called indigo, we would normally call blue; his blue is then
```
what we would name blue-green or cyan” [Wal02, p.193].
Finlay points out that, in the eighteenth century, indigo
referred to a much wider range of colours than it does
today [Fin07, p.340], generated by different concentrations
of indigo dye. Taking into account both this information
about the meanings of words and also the non-uniform
spacing of colours means that a na¨ıve version of Newton’s
```
colour wheel (Figure 11(a)) is incorrect and what he meant is
```
```
much better represented by Figure 11(b), where we replace
```
Newton’s “blue” by “cyan” and his “indigo” by our modern
“blue”. We now find that the opposite of blue is orange-
yellow.
How much easier would our explanation of the rainbow
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 12
```
(a) (b) R
```
C
V O
Y
G
B
R
I
V O
Y
GB
```
Fig. 11. Two representations of Newton’s colour wheel. (a) The wheel as
```
it would be generated from a na¨ıve literal reading of the colour names
```
and from equal spacing around the wheel. (b) The wheel when we take
```
into account that Newton’s “indigo” is a modern blue, his “blue” is cyan
```
and his spacing around the wheel is non-uniform (Figure 10).
```
be if Newton had chosen to stick with his original five
colours, or had chosen to introduce cyan as his seventh
colour instead of indigo? We may even have been on the
way to having a twelfth basic colour term adopted into
English, as does Russian. Russian does have seven basic
colour terms in its rainbow [Par05]. As it is, indigo is a
constant source of confusion in teaching colour in English:
children are taught that indigo is a fundamental colour in
the rainbow, but most people do not distinguish it as a
separate colour. The artist’s colour wheel discards it with-
out hesitation: the seven colour ROYGBIV becomes the six
colour ROYGBP.
ACKNOWLEDGEMENTS
Thanks to the anonymous reviewers for their careful read-
ing of the manuscript and for their substantial input that
considerably improved the quality of this final version.
REFERENCES
[Alb66] Leon Battista Alberti. On Painting. Yale University Press,
second edition, 1966. A translation, with introduction
and notes, by J. R. Spencer of the Latin De Pictura, first
published 1435.
[ATF86] Gail Rex Andrick and Helen Tager-Flusberg. The acquisi-
```
tion of colour terms. Journal of Child Language, 13(1):119–
```
134, 1986.
[Ber81] Roy S. Berns. Billmeyer and Saltzman’s Principles of Color
Technology. Wiley, third edition, 1981.
[BK69] Brent Berlin and Paul Kay. Basic Color Terms: Their Univer-
sality and Evolution. Univ of California Press, 1969.
[Ble12] Steven Bleicher. Contemporary Color: Theory and Use. Cen-
gage Learning, second edition, 2012.
[Boy64] Robert Boyle. Experiments and Considerations Touching
Colours. Henry Herringman, 1664.
[Bri07] David J. C. Briggs. The Dimensions of Colour: modern
colour theory for traditional and digital painting me-
dia, 2007. http://www.huevaluechroma.com/, visited on
2018–12–24.
[Cia76] Patricia J Cianciolo. Illustrations in Children’s Books. Wm.
C. Brown Company Publishers, second edition, 1976.
[Der91] G. Derefeldt. Colour appearance systems. In P. Gouras,
editor, The Perception of Colour, pages 218–261. Macmillan,
Basingstoke, 1991.
[Fai05] Mark D Fairchild. Color Appearance Models. Wiley, 2005.
[Fin07] Victoria Finlay. Color: A Natural History of the Palette.
Random House, 2007.
[Fry06] Michael J. Fryer. Complementarity. Optics & Laser Technol-
```
ogy, 38(4):417–430, 2006.
```
[FvDFH90] James D. Foley, Andries van Dam, Steven K. Feiner, and
John F. Hughes. Computer Graphics: Principles and Practice.
Addison-Wesley, second edition, 1990.
[Gei80] Lazarus Geiger. Contributions to the History of the Develop-
ment of the Human Race. Tr ¨ubner & Company, 1880.
[Gle03] Libby Gleeson. Making Picture Books. Scholastic Press,
Gosford, NSW, Australia, 2003.
[Gou91] P. Gouras. Cortical mechanisms of colour vision. In
P. Gouras, editor, The Perception of Colour, pages 179–197.
Macmillan, Basingstoke, 1991.
[Har98] Clyde L Hardin. Basic color terms and basic color cat-
egories. In Werner G. K. Backhaus, Werner Backhaus,
Reinhold Kliegl, and John Simon Werner, editors, Color
```
Vision: Perspectives from Different Disciplines, chapter 11,
```
pages 207–217. Walter de Gruyter, 1998.
[Har05] Clyde L Hardin. Explaining basic color categories. Cross-
```
Cultural Research, 39(1):72–87, 2005.
```
[Har06] Nick Harkness. The colour wheels of art, perception, sci-
```
ence and physiology. Optics & Laser Technology, 38(4):219–
```
229, 2006.
[HJ57] Leo M Hurvich and Dorothea Jameson. An opponent-
```
process theory of color vision. Psychological Review, 64(6,
```
```
pt. 1):384–404, 1957.
```
[HST96] Anders H˚ard, Lars Sivik, and Gunnar Tonnquist. NCS,
Natural Color System—from concept to research and ap-
```
plications. Part I. Color Research & Application, 21(3):180–
```
205, 1996.
[Hun75] Richard S. Hunter. The Measurement of Appearance. Wiley,
1975.
[Itt70] Johannes Itten. The Elements of Color. Van Nostrand
Reinhold, New York, 1970.
[JMF94] Richard Jackson, Lindsay MacDonald, and Ken Freeman.
Computer Generated Color: A Practical Guide to Presentation
and Display. Wiley, 1994.
[Jon13] William Jervis Jones. German Colour Terms: a study in their
historical evolution from earliest times to the present. John
Benjamins Publishing, 2013.
[KB96] Peter K Kaiser and Robert M Boynton. Human Color Vision.
Optical Society of America, 1996.
[Kip01] Helmut Kipphan, editor. Handbook of Print Media: Technolo-
gies and Production Methods. Springer, 2001.
[KS08] Rolf G Kuehni and Andreas Schwarz. Color ordered: a
survey of color systems from antiquity to the present. Oxford
University Press, 2008.
[Mun76] Munsell Color. Munsell Book of Color. Munsell Color
Company, Baltimore, 1976.
[Mun18] Munsell Color. Munsell Color website, 2018.
```
http://www.munsell.com/, visited on 2018–12–24.
```
[NCS18] NCS Colour AB. NCS Colour website, 2018.
```
http://www.ncscolour.com/, visited on 2018–12–24.
```
[New04] Isaac Newton. Opticks: or, a Treatise of the Reflexions, Refrac-
tions, Inflexions and Colours of Light. Royal Society, 1704.
[Par05] Galina V Paramei. Singing the Russian blues: An argument
for culturally basic color terms. Cross-cultural research,
```
39(1):10–38, 2005.
```
[PF82] Charles Parkhurst and Robert L Feller. Who invented the
```
color wheel? Color Research & Application, 7(3):217–230,
```
1982.
[Pla06] Jim Platts. Newton, Goethe and the process of perception:
```
an approach to design. Optics & Laser Technology, 38(4):205–
```
209, 2006.
[RDD00] Debi Roberson, Ian Davies, and Jules Davidoff. Color
categories are not universal: replications and new evidence
from a stone-age culture. Journal of Experimental Psychology:
```
General, 129(3):369–398, 2000.
```
[RH72] Eleanor Rosch Heider. Universals in color naming and
```
memory. Journal of Experimental Psychology, 93(1):10–20,
```
1972.
[Rib85] Neil M Ribe. Goethe’s critique of Newton: A reconsider-
ation. Studies in History and Philosophy of Science Part A,
```
16(4):315–335, 1985.
```
[SAM09] Peter Shirley, Michael Ashikhmin, and Steve Marschner.
Fundamentals of Computer Graphics. AK Peters, third edi-
tion, 2009.
[Sha94] Alan E Shapiro. Artists’ colors and Newton’s colors. Isis,
```
85(4):600–630, 1994.
```
[Sto03] Maureen Stone. A Field Guide to Digital Color. AK Peters,
2003.
[Swe89] Swedish Standard. Swedish Standard SS 01 91 02 Colour
```
Atlas. Swedish Standards Institution (SIS), Stockholm,
```
second edition, 1989.
JOURNAL OF PERCEPTUAL IMAGING, VOL. 2, NO. 1, JAN–JUN 2019 13
[Wal02] Gary Waldman. Introduction to Light: The Physics of Light,
Vision, and Color. Dover, 2002.
[WWF+07] Jonathan Winawer, Nathan Witthoft, Michael C. Frank,
Lisa Wu, Alex R. Wade, and Lera Boroditsky. Russian
blues reveal effects of language on color discrimination.
```
Proceedings of the National Academy of Sciences, 104(19):7780–
```
7785, 2007.

---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, tdd, vcs, api]
