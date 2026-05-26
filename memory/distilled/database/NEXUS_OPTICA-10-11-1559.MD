> **VERSION**: v1 | **Last Updated**: 26/05/2026

##### Research Article Vol. 10, No. 11 / November 2023 / Optica 1559
Quantum-dot color wheel for projection displays
Yinguo Yan,1 Yuze Xiao,1 Junhu Cai,1 Yushuo Zhang,1 Yun Ye,1,2 Sheng Xu,1,2 Qun Yan,1,2
Tailiang Guo,1,2 AND Enguo Chen1,2,*
1 National and Local United Engineering Laboratory of Flat Panel Display Technology, College of Physics and Information Engineering,
Fuzhou University, Fuzhou 350108, China2
Fujian Science & Technology Innovation Laboratory for Optoelectronic Information of China, Fuzhou 350108, China
*ceg@fzu.edu.cn
```
Received 11 August 2023; revised 23 October 2023; accepted 23 October 2023; published 15 November 2023
```
```
A color wheel (CW) is one of the most essential devices for contemporary projection displays because it provides the
```
color initialization definition and determines the color performance of the whole system. However, conventional color
wheels remain limited in terms of color performance and efficiency because of the light-absorbing material and time
sequential color generation. Quantum dots, found in 1981 and known as a kind of quasi-zero-dimensional nanoma-
terial, exhibit excellent features for displays due to their quantum confinement effect, which won the 2023 Nobel Prize
```
in Chemistry. Inspired by this, the paper systematically demonstrates a quantum-dot color wheel (QD-CW) device
```
through theoretical derivation, simulation analysis, and experimental verification. The theoretical model to define the
duty circle ratio is presented for the QD-CW and verified by Monte Carlo ray-tracing simulation. In terms of experimen-
tal verification, the QD-CW device is realized by multiple rounds of a photolithography process, and then assembled
into a blue laser pumped projection prototype for full-color display. The chromaticity coordinates of white-balanced
```
output are finally located at (0.317,0.338), which matches well with a standard D65 source. The color gamut area of the
```
```
QD-CW device reaches 116.6% NTSC, and the average light conversion efficiency (LCE) of the prepared QD-CW is
```
57.0%. The proposed QD-CW device has ∼40% higher color gamut area and 1.2× higher LCE than a conventional CW
device. These exciting findings show a groundbreaking approach to color generation in projection displays, which are
expected to shed light on other high-quality display applications. © 2023 Optica Publishing Group under the terms of the
Optica Open Access Publishing Agreement
```
https://doi.org/10.1364/OPTICA.502938
```
1. INTRODUCTION
The optical engines of current mainstream projectors are com-
monly composed of a light source, an illumination system, a single
micro display chip, and an imaging system. The light source can
be a metal mercury lamp or a white LED to produce white light.
```
A color wheel (CW), consisting of multiple light-absorbing color
```
channels, is used to decompose the incident white light into multi-
ple primary colors within the time sequential domain and provide
the color initialization definition for projection displays [1–5]. The
conventional color wheel is inefficient with the light-absorbing
```
color filter (CF). The light with the required spectral waveband will
```
pass through the CF while the other light is blocked and absorbed,
thus enabling the separation and filtering of the incident white
light. The color gamut and color purity of the projection display
are limited by both the broad spectral distribution of the incident
white light and the wide bandwidth of the transmission spectrum
of the CW. The other color generation strategy is to use a blue exci-
tation source combined with a phosphor-based CW. For example,
Hu and Li developed a portable projector based on a blue laser
and phosphorescent wheel, which improved the color gamut by
30% with Rec. 709 standards when operating at full power [6].
However, an additional filter is required to filter out unwanted
light due to the broad emission spectrum of the phosphor, which
limits the efficiency and the color gamut.
```
As a rising star, quantum-dot (QD) material enables efficient
```
fluorescent conversion with a wider color gamut for emerging
display devices [7–16], which have exhibited their superiority
```
in QD photoluminescent organic light-emitting diodes (QD-
```
```
OLEDs) [17–19], QD electroluminescent light-emitting diodes
```
```
(QLEDs) [20–22], and micro-LEDs [23–27]. For example, in
```
2016, a patterned QD film was first prepared by Kim et al. for
the color conversion of an OLED backlight [28]. In 2020, Yin
et al. developed a high-efficiency full-color micro-LED display
by combining a QD film [29]. In 2015, Han et al. used aerosol jet
technology to combine red, green, and blue colloidal QDs with
micro-LED arrays to realize independent addressing of full-color
micro-LED arrays [30]. In 2020, Chen et al. realized a high-color-
gamut micro-LED display combined with QD photoresist by
photolithographic preparation [31]. This kind of QD converted
micro-LED display can also be realized by inkjet printing tech-
nology [32]. The aforementioned researches demonstrate that
introducing the superiority of QDs brings certain interesting find-
ings for emerging display devices. Inspired by this, a performance
revolution of traditional CW devices is just around the corner, but
it has not been explicitly explored before.
2334-2536/23/111559-08 Journal © 2023 Optica Publishing Group
Research Article Vol. 10, No. 11 / November 2023 / Optica 1560
For the first time, to the best of our knowledge, this paper
presents a QD-color-converted CW device by using three-
```
primary-color QD color conversion layers (QDCCL) instead
```
of an absorptive metal coating, which brings superior optical and
color performance compared to conventional projection displays.
The detailed theoretical derivation is disclosed and verified via both
simulation and experiment. The fundamental theory for the white
```
balance of the QD-CW device is first presented; then, the Monte
```
Carlo ray-tracing simulation is used to explore the light output
characteristics of the QD-CW device. Finally, a blue laser pumped
laser projector prototype equipped with the proposed QD-CW
device is experimentally assembled and discussed.
2. THEORETICAL MODEL
In a traditional CW device, the absorptive metal coating layers
usually include three primary color channels or specific additional
channels, such as white channels to increase the brightness, and
yellow and cyan channels to widen the color gamut. As for the
QD-CW device, the backlight should be replaced by a blue exci-
tation source. Considering the three primary color QD channels,
the definition of the duty cycle is critical for the output white light
within the spatial domain.
White balance is a key display indicator that describes the
accuracy of the white color generated by mixing the three primary
```
colors. It can be achieved when the intensity of the red (R), green
```
```
(G), and blue (B) light matches each other [33–37]. In a stand-
```
ard room, the D65 light source with chromaticity coordinates of
```
(0.313,0.329) is usually defined as the white balance [38–41].
```
The white balance can be achieved by adjusting the transmis-
sion area of the three primary color channels on the QD-CW
device. The principle of white balance adjustment for a QD-CW
device can be expressed by
```
SR ηR : SG ηG : SB ηB = PR : PG : PB , (1)
```
```
where PR , PG , and PB are the luminous power; SR , SG , and
```
```
SB are the areas; and ηR , ηG , and ηB are the light conversion
```
```
efficiencies (LCE) of the RGB color channels, respectively. The
```
blue channel is kept blank to allow the blue backlight to pass
through so that ηB can be ideally considered as 100%. Based on
```
Eq. (1), the white-balanced area ratio of RGB color channels can be
```
determined by
```
SR : SG : SB = PRη
```
R
: PGη
G
: PBη
B
```
, (2)
```
where the area of the RGB color channel can be further expanded
```
as S = 1/2(θr 2) for a fan-shaped CW. θR , θG , and θB are defined
```
as the circular angles of the RGB color channels on the QD-CW,
respectively. Finally, the ratio of the circular angles of the RGB
color block, also known as the duty cycle, can be expressed by
θR : θG : θB = 2PRη
R r 2
: 2PGη
G r 2
: 2PBη
B r 2
```
. (3)
```
3. PARAMETERIZATION
A. Quantum-Dot Characterization
The approach to design a QD-CW device is described, and the key
parameters come from both the experimental characterization of
the QD material and the duty cycle simulation for white balance.
```
The visible absorption spectra (Abs) and photoluminescence
```
```
(PL) spectra of red and green core-shell CdSe@ZnS QDs in a
```
```
toluene solution are measured and shown in Figs. 1(a) and 1(b),
```
respectively. The red and green peak wavelengths are 626 nm and
```
530 nm, and the full width at half maximum (FWHM) is 26 nm
```
```
and 21 nm, respectively. The quantum yields (QY) of red and
```
green QD are above 80%, in which the QY of green QD reaches
97%. The PLQY of CdSe QDs is enhanced after ZnS shell coating
because the coating layer can eliminate many nonradiative com-
posite centers on the QD’s surface. The existence of the shell will
also provide a stable and reliable working environment for water
and oxygen resistance [42–45].
```
X-ray diffraction spectra (XRD) of red and green QDs are
```
```
shown in Figs. 1(c) and 1(d), respectively. Compared to the stand-
```
ard PDF spectra of CdSe and ZnS, the spectral diffraction peaks
of red and green QDs are in between the CdSe and ZnS spectral
diffraction peaks, which confirms the core shell CdSe@ZnS struc-
ture. The interaction between the nanoparticles and the solvent,
```
Fig. 1. Quantum-dot characterization for the design of a three primary color QD-CW device. Abs and PL spectra of: (a) red and (b) green QDs. XRD
```
```
of: (c) red and (d) green QDs. TEM images of: (e) red and (f ) green QDs, where the inserted graphs are the average particle size distribution of red and green
```
QDs.
Research Article Vol. 10, No. 11 / November 2023 / Optica 1561
as well as the volatilization of the solvent molecules, would bring
about the aggregation of the QD particles. The agglomeration
can seriously affect the LCE and stability of the QD-CW device.
To evaluate the dispersibility of QD particles in the toluene solu-
tion, the structural morphology of CdSe@ZnS QDs is further
```
characterized by using transmission electron microscopy (TEM).
```
```
Figures 1(e) and 1(f ) both show that the red and green QDs have
```
been well dispersed. The average particle sizes of red and green
CdSe@ZnS QDs are 8.16 ± 0.95 nm and 10.32 ± 0.84 nm,
respectively.
B. Duty Cycle for White Balance
Based on the QD materials above, a ray-tracing simulation is then
used to determine the duty cycle of the QD-CW device. The initial
duty cycle of the QD-CW device is set to θR : θG : θB = 1 : 1 : 1.
```
Figures 2(a) and 2(b) show the schematic and the corresponding
```
emission spectrum, where the blue light intensity is significantly
larger than red and green. The output CIE chromaticity coordi-
```
nate point is (0.225, 0.123), obviously far from the target white
```
balance of the standard D65 light source. Keeping the simulation
parameters unchanged, the duty cycle is scanned for searching
the target white balance. When θR : θG : θB reaches 3.286: 4.286:
1, the standard D65 white balance can be finally achieved. This
```
result is very close to that calculated in Eq. (3). The detailed deriva-
```
tion of the theoretical validation can be found in Supplement 1.
```
Figures 2(c) and 2(d) show the schematic diagram of the optimized
```
QD-CW device and the corresponding emission spectrum. It
can be seen that the blue light is significantly reduced, while the
red and green spectra are enhanced accordingly. The output CIE
white balance has been achieved with the chromaticity coordinate
```
point of (0.313, 0.329), matching perfectly with the standard D65
```
source.
```
Fig. 2. Schematic of the QD-CW device with: (a) the initial
```
```
duty cycle of θR : θG : θB = 1 : 1 : 1 and (c) the optimized duty
```
cycle of θR : θG : θB = 3.286 : 4.286 : 1. Simulated emission spec-
```
tra of the QD-CW device with: (b) θR : θG : θB = 1 : 1 : 1 and
```
```
(d) θR: θG: θB = 3.286 : 4.286 : 1.
```
4. EXPERIMENTS
A. Preparation and Characterization
```
As shown in Fig. 3(a), a QD-CW device sample with the duty
```
cycle above can be divided into four segments, and the QDCCLs
are fabricated by multiple rounds of a photolithography process.
The fabrication details are described in Supplement 1. The left
```
side of Fig. 3(b) shows the QD-CW under natural light, and the
```
right side shows the QD-CW under UV light. It can be seen that
the red and green segments are bright and uniform on the glass
```
substrate. Figures 3(c) and 3(d) show the 2D and 3D morphology
```
of the surface roughness of the red and green QDCCL measured
```
by atomic force microscopy (AFM, Bruker, multimode 8). The
```
```
root mean square height (Sq) and arithmetic means the height (Sa)
```
of the red QDCCLs are, respectively, measured to be 0.329 nm
and 0.257 nm, while those of the green QDCCLs are 0.436 nm
and 0.337 nm, respectively. This surface roughness proves that the
surface of the red and green QDCCLs is smooth and flat [46–48].
B. Color Performance
A mini-LED backlight is used here to evaluate the color perform-
ance of the fabricated QD-CW device sample. The normalized
```
spectrum of the mini-LED backlight is indicated by A0 in Fig. 4(a).
```
After passing through the green segment the QD-CW sample, the
spectrum is split into two independent parts: A1G and A2G. The
red light conversion has similar two output parts. Obviously, A2G
is the intensity of the converted green light, and A1G represents
the intensity of the remaining blue light without color conversion
and directly passing through the green QDCCL. This will reduce
```
the color purity; therefore, a long-pass distributed Bragg reflector
```
```
(DBR) is placed on top of the QDCCL to reduce the blue light
```
transmission. The DBR is made by stacking the multiple periodic
```
films with high and low refractive indices; the thickness of each
```
film is 1/4 of the wavelength of its central reflection [49–51]. The
strong wavelength selective transmittance of the DBR can help
to reflect the blue light and let the converted light pass through
```
[52,53]. As shown in Fig. 4(b), the transmission spectrum of this
```
DBR has a dramatic change at the wavelength of 500 nm. The
transmittance approaches 0 for the wavelength lower than 500 nm
and up to 95.5% for the wavelength higher than 500 nm. It means
the DBR can provide high reflectivity for blue light and high trans-
mission for converted light from the QDCCL. The parameters
of the DBR are also used in the simulation to determine the duty
cycle.
```
In Fig. 4(c), the green curve shows the emission spectrum of the
```
green QDCCL by using the DBR. The blue waveband has been
eliminated well, with the green intensity growing by 2%. The blue
```
light absorption (BLA) and light conversion efficiency (LCE, η) are
```
defined, respectively, by
```
BLA = Iin − ItbI
```
in
```
= A0 − A1A0 , (4)
```
η = IocI
in
```
= A2A0 , (5)
```
where Itb, Ioc, and Iin are the intensity of the transmitted blue light,
the converted light, and the total incident light, respectively. A0
indicates the total number of blue photons obtained by integrating
```
over the wavelength range of blue light, as shown in Figs. 4(a) and
```
```
4(c). A1 indicates the number of blue photons that remain after
```
Research Article Vol. 10, No. 11 / November 2023 / Optica 1562
```
Fig. 3. Experimental results of the QD-CW device sample. (a) Four segments of the fabricated QD-CW device sample. (b) Sample under the natural
```
```
light and UV light. AFM images of: (c) the red and (d) green QDCCLs on the QD-CW device sample.
```
```
Fig. 4. Color performance of the QD-CW device sample. Emission spectrum and the performance of the red and green QDCCLs (a) without the DBR
```
```
and (c) with the DBR. (b) Transmission spectrum of the DBR. (d) Working mechanism of the DBR.
```
passing through the QDCCL, obtained by integrating over the
wavelength range of the blue light passing through the QDCCL.
A2 indicates the number of photons converted after passing
through the QDCCL, obtained by integrating over the wavelength
range corresponding to the red or green light. The expression of
A0, A1, and A2 can be calculated by



```
A0 =
```
∫ λ1
```
λ2 ϕB (λ)dλ
```
```
A1 =
```
∫ λ1
```
λ2 ϕB (λ)dλ
```
```
A2i =
```
∫ λ1
```
λ2 ϕi (λ)dλ, ( i = R, G)
```
```
. (6)
```
By combining the equations above, the overall LCE of the QD-
CW device, ηoverall, is given by
```
ηoverall = ηB θB + ηR θR + ηG θG360◦ . (7)
```
After calculation, the BLA of the green QDCCL is increased
from 88.3% to 99.6%, and the LCE is increased from 28.3% to
31.6%. The color purity is also improved, with the chromaticity
```
coordinates changing from (0.172, 0.451) to (0.187, 0.745).
```
A similar performance improvement is clearly found for the red
QDCCL, in which the BLA and LCE of the red QDCCL increased
from 94.3% to 99.3% and from 34.7% to 39.5%, respectively. The
Research Article Vol. 10, No. 11 / November 2023 / Optica 1563
```
chromaticity coordinate changes from (0.543, 0.236) to (0.677,
```
```
0.300). It means that the DBR can greatly reduce the number
```
of blue photons passing through the QDCCL and improve the
color purity of the QDCCL. When θR : θG : θB = 1 : 1 : 1 is
set for the QD-CW device sample, the average LCE is 57.0%.
Compared to a conventional CF-based phosphor-converted
CW, in which the loss in CF layers is over 74.0% [54], the over-
all LCE is improved by 31.0% when the optimized duty cycle,
θR : θG : θB = 3.286 : 4.286 : 1, is set.
```
The working mechanism of the DBR is illustrated in Fig. 4(d).
```
The incident blue light with the intensity IB can be divided into
two parts after passing through the green QDCCL: the converted
green light with the intensity IG , and the remaining blue light with
the intensity Ib . The remaining blue light cannot pass through
DBR and would excite the QDCCL again. Ig is the intensity of
the converted light after reuse of the blue light. That is why the
```
converted light intensity shown in Fig. 3(c) can be improved after
```
introducing this DBR.
C. White Balance
The QD-CW device sample is electrically driven by a small motor
and rotated at a uniform speed to achieve the white balance output.
```
Figure 5(a) shows the explosive view of the working QD-CW
```
```
device and the corresponding testing platform (SRC-200M,
```
```
Everfine Corporation). The blue light passes through the red,
```
green, and blue segment of the QD-CW sample in turn, and then
the emitted light is collected by the spectral color luminance meter.
```
Figure 5(b) shows the working principle of the QD-CW device
```
sample for color conversion. In a complete rotation cycle T, the
QD-CW device sample will output blue, green, and red light
in turn according to the pre-determined duty cycle. When the
Fig. 5. White balance realization of the QD-CW device sample.
```
(a) Explosive view of the QD-CW device sample and the corresponding
```
```
testing platform. (b) Working principle of the QD-CW device sample.
```
```
(c) Measured spectrum of the white light emitted. (d) Output spatial
```
```
light intensity distribution. (e) Color gamut area of the QD-CW device
```
sample.
transparent part of the QD-CW device sample is rotated above the
blue mini-LED backlight, the QD-CW device sample will output
blue light in T1. Similarly, T2 and T3, respectively, represent the
red and green light output periods when the red or green QDCCL
on the QD-CW is aligned with the blue mini-LED backlight.
More details about the output red, green, and blue light from the
QD-CW device sample can be found in Supplement 1.
The final emission spectrum of the QD-CW device sample
```
is shown in Fig. 5(c). The chromaticity coordinate is (0.317,
```
```
0.338), which matches well with the chromaticity coordinate
```
```
(0.313,0.329) of the D65 white balance. The inset of Fig. 5(c)
```
shows the fast-spinning QD-CW device sample achieving white
balance. When the QD-CW device sample is rotating at a low
speed, the color separation can be clearly observed. As the speed
increases, the white light is observed without color separation.
The three primary colors are mixed uniformly in the space. The
complete video clip recorded from the QD-CW device sample
achieving white balance can be found in Visualization 1.
For the QD-CW device, the color breakup phenomenon
cannot be ignored when the CW’s rotation speed is slower than
the refresh frequency of the projector’s display panel. Increasing
the color wheel’s rotation speed to synchronize with the display
panel should be a straightforward approach to mitigate the color
breakup. In this case, other issues that are worth noting should be
the mechanical stability and noise of the QD-CW device. After a
good matching between the color wheel’s rotation speed and the
refresh frequency of the projector’s display panel, another main
cause of the color breakup should be the visual stability of the
human eye [55]. In this case, the occurrence of the color breakup
phenomenon is mainly attributed to the action of eye position
signals during the saccade movement. To mitigate this kind of
color breakup, one approach is to use a multiple primary color
wheel or swirl color wheel to enhance color overlay and balance,
where the multiple primary color QDCCL has been demonstrated
before [56]. The second method is the image motion compen-
sation, which first calculates the motion vector through the pixel
displacement between adjacent frames and then compensates for
the pixel position in the current frame to offset the displacement
generated by the eye position signal.
```
As shown in Fig. 5(d), the output spatial light intensity distribu-
```
tion of the QD-CW device sample is measured by the photometer
```
(GO-I300, Everfine Corporation). It can be seen that the spatial
```
light intensity distribution matches the standard Lambertian
distribution, which is beneficial for displays with a large viewing
angle. At the same time, the color gamut area of the QD-CW sys-
tem is defined as the comparison between the three primary color
triangular area of the QD-CW based display and the triangular
area of the NTSC standard [57]. Therefore, the color gamut area is
calculated to reach 116.6% NTSC, which is approximately 40%
higher than a conventional CW system.
D. Projection Display
```
Figure 6(a) shows the schematic of a projection display prototype
```
that is combined by a blue laser pumped projector and the prepared
QD-CW device sample. The blue imaging pattern emitted by
the laser projector will pass through the chromatic segments on
the QD-CW device in turn. The corresponding color-converted
```
images on the screen are shown in Figs. 6(b)–6(d). The blue image
```
```
in Fig. 6(b) is clear, because the blue light can directly pass through
```
the QD-CW device sample. However, the red and green images
Research Article Vol. 10, No. 11 / November 2023 / Optica 1564
Fig. 6. Projector prototype based on the prepared QD-CW device
```
sample. (a) Schematic of the projector. (b)–(d) Projection images
```
generated by the QD-CW device sample.
become somewhat fuzzy because of the QD scattering. The QD
scattering also brings some blue light leakage, resulting in the color
```
deviation from pure red and green in Figs. 6(c) and 6(d). This
```
prototype shows a straightforward projection application based
on the QD-CW device sample. In addition, this QD-CW can also
generate white-balanced light by a blue backlight, which makes it
compatible with passive luminous projection architectures, such as
DMD, LCoS, and LCD.
For this prototype, both the QD scattering and the relative
location with projection optics will affect the projector contrast to
some extent, which is discussed in detail and experimentally com-
pared to a conventional phosphor-based CW. In Supplement 1, it
is found that the QD-CW provides a higher image contrast than a
conventional phosphor-based CW device. The main reason is that
the phosphor powders have larger particle sizes than QDs, which
leads to stronger scattering characteristics and more color conver-
sion light leaking into the background area. On the other part, the
relative position between the blue laser projector and the QD-CW
affects the size of the excited region, and the relative position of
the QD-CW and the projection screen determines whether the
scattered light will affect the overall area of the projection screen.
Inserting a focusing optical element could help to shield scattered
light outside the excitation area and further improve the projector
contrast.
Another concern is the thermal quenching and photodegrada-
tion of the QD-CW device. In this work, the rated power of the
laser projector used is 25 W, and the luminous flux of the blue light
that excites the QD-CW is measured to be only 0.35 lm. Under
such low blue light excitation, there is not much of a decrease in the
brightness from the potential thermal quenching of QD materials.
Moreover, the QDCC materials encapsulated in the photoresist
also have certain advantages in thermal stability compared to pure
QDs. The reliability testing details of the QD-CW device can be
found in Supplement 1. Note that when using a laser projector as a
blue excitation source, the stability of the QD-CW device largely
depends on the intensity of the laser source. When a high-power
blue laser is used, the lattice destruction of the QDs would be
promoted by water and oxygen, causing fluorescence quenching of
the QD-CW device. Atomic layer deposition or a polymer matrix
are possible approaches to lengthen the QD’s lifetime [8,58,59].
5. CONCLUSION
This paper presents and systematically studies a newly proposed
QD-CW device by theoretical derivation, simulation analysis, and
experimental verification. The duty cycle of the QD-CW device
is theoretically calculated as θR : θG : θB = 3.286 : 4.286 : 1 to
achieve the white balance, and the CIE chromaticity coordinate
```
point is proven to be (0.313, 0.328) from ray-tracing simulation.
```
For experimental verification, a QD-CW device sample was pre-
pared using multiple rounds of a photolithography process. By
integrating a DBR, the QD-CW device can provide the white light
```
output with a chromaticity coordinate point of (0.317,0.338),
```
which matches well with the standard D65 light source and the
simulation result. The color gamut area of the QD-CW device
sample reaches 116.6% NTSC, and the average LCE is 57.0%.
The proposed QD-CW device has 1.2× higher LCE and ∼40%
higher color gamut area than a conventional CW device. A direct-
view laser pumped projector is assembled by this QD-CW device
sample, where the full-color projection images are realized. It
is expected that this novel QD-CW device with its improved
efficiency and color performance will be used for applications in
projection displays and related display fields.
```
Funding. National Natural Science Foundation of China (62175032); Fujian
```
Science and Technology Innovation Laboratory for Optoelectronic Information of
```
China (2020ZZ111).
```
Disclosures. The authors declare no conflicts of interest.
Data availability. Data underlying the results presented in this paper are not
publicly available at this time but may be obtained from the authors upon reason-
able request.
Supplemental document. See Supplement 1 for supporting content.
REFERENCES
1. S. Han, I. Sato, T. Okabe, and Y. Sato, “Fast spectral reflectance recov-
```
ery using DLP projector,” Int. J. Comput. Vision 110, 172–184 (2014).
```
2. G. Koutaki, H. Okajima, N. Matsunaga, and K. Uchimura, “Optimization
of color quantization with total luminance for Dlp projector and its evalu-
ation system,” in IEEE International Conference on Image Processing
```
(ICIP) (2015), pp. 38–42.
```
3. M. J. O’Callaghan, R. Ferguson, R. Vohra, W. Thurmes, A. W. Harant,
C. S. Pecinovsky, Y. Zhang, S. Yang, M. O’Neill, and M. A. Handschy,
“Bistable FLCOS devices for doubled-brightness micro-projectors,” J.
```
Soc. Inf. Disp. 17, 369–375 (2009).
```
4. S. Liao, Z. Yang, J. Lin, S. Wang, J. Zhu, and S. Chen, “A hierarchi-
cal structure perovskite quantum dots film for laser-driven projection
```
display,” Adv. Funct. Mater. 33, 2210558 (2023).
```
5. J. Li, D. Zhou, Y. Liu, Y. Chen, J. Chen, Y. Yang, Y. Gao, and J. Qiu,
```
“Engineering CsPbX3 (X = Cl, Br, I) quantum dot-embedded borosilicate
```
glass through self-crystallization facilitated by NaF as a phosphor for
full-color illumination and laser-driven projection displays,” ACS Appl.
```
Mater. Interfaces 15, 22219–22230 (2023).
```
6. F. Hu and Y. Li, “Laser and phosphor hybrid source for projection
```
display,” Proc. SPIE 8599, 85991K (2013).
```
7. B. H. Kim, S. Nam, N. Oh, et al., “Multilayer transfer printing for pixe-
lated, multicolor quantum dot light-emitting diodes,” ACS Nano 10,
```
4920–4925 (2016).
```
8. Y. Chen, J. Cai, J. Lin, X. Hu, C. Wang, E. Chen, J. Sun, Q. Yan, and T.
Guo, “Quantum-dot array with a random rough interface encapsulated
```
by atomic layer deposition,” Opt. Lett. 47, 166–169 (2022).
```
9. E. Chen, J. Lin, T. Yang, Y. Chen, X. Zhang, Y. Ye, J. Sun, Q. Yan, and T.
Guo, “Asymmetric quantum-dot pixelation for color-converted white
```
balance,” ACS Photon. 8, 2158–2165 (2021).
```
10. S. Xu, T. Yang, J. Lin, Q. Shen, J. Li, Y. Ye, L. Wang, X. Zhou, E. Chen,
Y. Ye, and T. Guo, “Precise theoretical model for quantum-dot color con-
```
version,” Opt. Express 29, 18654–18668 (2021).
```
Research Article Vol. 10, No. 11 / November 2023 / Optica 1565
11. J. Kim, H. J. Shim, J. Yang, M. K. Choi, D. C. Kim, J. Kim, T. Hyeon, and
D. H. Kim, “Ultrathin quantum dot display integrated with wearable elec-
```
tronics,” Adv. Mater. 29, 1700217 (2017).
```
12. G. Zaiats, S. Ikeda, S. Kinge, and P. V. Kamat, “Quantum dot light-
emitting devices: beyond alignment of energy levels,” ACS Appl. Mater.
```
Interfaces 9, 30741–30745 (2017).
```
13. C. Cheng, A. Liu, G. Ba, I. S. Mukhin, F. Huang, R. M. Islamova, W.
C. H. Choy, and J. Tian, “High-efficiency quantum-dot light-emitting
diodes enabled by boosting the hole injection,” J. Mater. Chem. C 10,
```
15200–15206 (2022).
```
14. D. Zhang, Y. Liu, and L. Zhu, “Surface engineering of ZnO nanoparti-
cles with diethylenetriamine for efficient red quantum-dot light-emitting
```
diodes,” iScience 25, 105111 (2022).
```
15. Z. He, C. Zhang, H. Chen, Y. Dong, and S. T. Wu, “Perovskite downcon-
verters for efficient, excellent color-rendering, and circadian solid-state
```
lighting,” Nanomaterials 9, 176 (2019).
```
16. Z. He, J. He, C. Zhang, S. T. Wu, and Y. Dong, “Swelling-deswelling
microencapsulation-enabled ultrastable perovskite-polymer
```
composites for photonic applications,” Chem. Rec. 20, 672–681 (2020).
```
17. T. H. Kim, K. S. Cho, E. K. Lee, S. J. Lee, J. Chae, J. W. Kim, D. H. Kim, J.
Y. Kwon, G. Amaratunga, S. Y. Lee, B. L. Choi, Y. Kuk, J. M. Kim, and K.
Kim, “Full-colour quantum dot displays fabricated by transfer printing,”
```
Nat. Photonics 5, 176–182 (2011).
```
18. A. G. Vitukhnovskii, A. A. Vaschenko, D. N. Bychkovskii, D. N. Dirin, P. N.
Tananaev, M. S. Vakshtein, and D. A. Korzhonov, “Photo- and electro-
luminescence from semiconductor colloidal quantum dots in organic
```
matrices: QD-OLED,” Semiconductors 47, 1567–1569 (2013).
```
19. W. Huang, Q. Jin, D. Zhao, Z. Sun, W. Li, S. Shu, Q. Sun, Y. Tian, J.
Zhang, and C. An, “62-2: flexible full-color active-matrix quantum-dot
```
OLED display,” SID Symp. Dig. Tech. Pap. 52, 888–891 (2021).
```
20. W. Mei, Z. Zhang, A. Zhang, D. Li, X. Zhang, H. Wang, Z. Chen, Y. Li, X. Li,
and X. Xu, “High-resolution, full-color quantum dot light-emitting diode
display fabricated via photolithography approach,” Nano Res. 13, 2485–
```
2491 (2020).
```
21. C. Cheng, X. Sun, Z. Yao, C. Bi, X. Wei, J. Wang, and J. Tian, “Balancing
charge injection in quantum dot light-emitting diodes to achieve high
```
efficienciy of over 21%,” Sci. China Mater. 65, 1882–1889 (2022).
```
22. T. Ryowa, T. Ishida, Y. Sakakibara, K. Kitano, M. Ueda, M. Izumi, Y.
Ogura, M. Tanaka, S. Nikata, M. Watanabe, M. Takasaki, T. Itoh, and
A. Miyanaga, “58-3: distinguished paper: high-efficient quantum-dot
light-emitting diodes with blue cadmium-free quantum dots,” SID Symp.
```
Dig. Tech. Pap. 51, 866–869 (2020).
```
23. Y. Huang, J. Chen, Y. H. Liou, K. J. Singh, W. C. Tsai, J. Han, C. Lin, T. S.
Kao, C. Lin, S. Chen, and H. Kuo, “High-uniform and high-efficient color
conversion nanoporous GaN-based micro-LED display with embedded
```
quantum dots,” Nanomaterials 12, 2696 (2022).
```
24. K. Ding, V. Avrutin, N. Izyumskaya, U. Ozgur, and H. Morkoc,
“Micro-LEDs, a manufacturability perspective,” Appl. Sci. 9, 1206
```
(2019).
```
25. A. R. Anwar, M. T. Sajjad, M. A. Johar, C. A. Hernández-Gutiérrez, M.
Usman, and S. P. Łepkowski, “Recent progress in micro-LED-based
```
display technologies,” Laser Photon. Rev. 16, 2100427 (2022).
```
26. W. H. Kim, Y. Jang, J. Y. Kim, M. Han, M. Kang, K. Yang, J. H. Ryou, and
M. K. Kwon, “High-performance color-converted full-color micro-LED
```
arrays,” Appl. Sci. 10, 2112 (2020).
```
27. Z. Wei, L. Wang, Z. Liu, C. Zhang, C. Chen, M. Wu, Y. Yang, C. Yu, L.
Wang, and H. Fu, “Multigigabit visible light communication based on
high-bandwidth InGaN quantum dot green micro-LED,” ACS Photon. 9,
```
2354–2366 (2022).
```
28. H. J. Kim, M. H. Shin, and Y. J. Kim, “Optical efficiency enhancement in
white organic light-emitting diode display with high color gamut using
patterned quantum dot film and long pass filter,” Jpn. J. Appl. Phys. 55,
```
08RF01 (2016).
```
29. Y. Yin, Z. Hu, M. U. Ali, M. Duan, L. Gao, M. Liu, W. Peng, J. Geng, S. Pan,
Y. Wu, J. Hou, J. Fan, D. Li, X. Zhang, and H. Meng, “Full-color micro-
LED display with CsPbBr3 perovskite and CdSe quantum dots as color
```
conversion layers,” Adv. Mater. 5, 2000251 (2020).
```
30. H. V. Han, H. Y. Lin, C. C. Lin, W. C. Chong, J. R. Li, K. J. Chen, P. C.
Yu, T. M. Chen, H. M. Chen, K. M. Lau, and H. C. Kuo, “Resonant-
enhanced full-color emission of quantum-dot-based micro-LED display
```
technology,” Opt. Express 23, 32504–32515 (2015).
```
31. S. W. H. Chen, Y. M. Huang, K. J. Singh, Y. C. Hsu, F. Y. Liou, J. Song, J.
Choi, P. S. Lee, C. C. Lin, Z. Chen, J. Han, T. Z. Wu, and H. C. Kuo, “Full-
```
color micro-LED display with high color stability using semipolar (20-21)
```
InGaN LEDs and quantum-dot photoresist,” Photon. Res. 8, 630–636
```
(2020).
```
32. T. Xuan, S. Shi, L. Wang, H. Kuo, and R. Xie, “Inkjet-printed quan-
tum dot color conversion films for high-resolution and full-color micro
light-emitting diode displays,” J. Phys. Chem. Lett. 11, 5184–5191
```
(2020).
```
33. V. Flauraud, M. Reyes, R. Paniagua-Dominguez, A. I. Kuznetsov, and J.
Brugger, “Silicon nanostructures for bright field full color prints,” ACS
```
Photon. 4, 1913–1919 (2017).
```
34. M. Frobel, F. Fries, T. Schwab, S. Lenk, K. Leo, M. C. Gather, and S.
Reineke, “Three-terminal RGB full-color OLED pixels for ultrahigh
```
density displays,” Sci. Rep. 8, 9684 (2018).
```
35. F. Li, S. Huang, X. Y. Liu, Z. L. Bai, Z. T. Wang, H. D. Xie, X. D. Bai, and
H. Z. Zhong, “Highly stable and spectrally tunable gamma phase
Rbx Cs1−x PbI3 gradient-alloyed quantum dots in PMMA matrix through A
```
sites engineering,” Adv. Funct. Mater. 31, 2008211 (2021).
```
36. K. Hieda, T. Maruyama, and F. Narusawa, “P-15.2: a study for easy
and quick white balance adjustment in laser display production,” in
```
International Conference on Display Technology (ICDT) (2019)., Vol. 50,
```
pp. 999–1001.
37. E. Chen, H. Xie, J. Huang, H. Miu, G. Shao, Y. Li, T. Guo, S. Xu, and Y. Ye,
“Flexible/curved backlight module with quantum-dots microstructure
```
array for liquid crystal displays,” Opt. Express 26, 3466–3482 (2018).
```
38. D. K. Dubey, S. Sahoo, C. W. Wang, and J. H. Jou, “Solution process
feasible highly efficient white organic light emitting diode,” Org. Electron.
```
69, 232–240 (2019).
```
39. E. Aksoy, A. Danos, C. Varlikli, and A. P. Monkman, “Navigating CIE
space for efficient TADF downconversion WOLEDs,” Dyes Pigm. 183,
```
108707 (2020).
```
40. S. Y. Chen and M. C. Wei, “LED illumination and color appearance of
```
white-balanced images,” Leukos 16, 203–215 (2020).
```
41. I. Boyadzhiev, K. Bala, S. Paris, and F. Durand, “User-guided white bal-
ance for mixed lighting conditions,” ACM Trans. Graph. 31, 201–210
```
(2012).
```
42. H. S. Shim, M. Ko, S. Jeong, S. Y. Shin, S. M. Park, Y. R. Do, and J. K.
Song, “Enhancement mechanism of quantum yield in alloyed-core/shell
structure of ZnS–CuInS2 /ZnS quantum dots,” J. Phys. Chem. C 125,
```
9965–9972 (2021).
```
43. J. Lim, W. K. Bae, D. Lee, M. K. Nam, J. Jung, C. Lee, K. Char, and S.
Lee, “InP@ZnSeS, Core@Composition gradient shell quantum dots with
```
enhanced stability,” Chem. Mater. 23, 4459–4463 (2011).
```
44. H. Xie, E. Chen, Y. Ye, S. Xu, and T. Guo, “Highly stabilized gradient
alloy quantum dots and silica hybrid nanospheres by core double shells
for photoluminescence devices,” J. Phys. Chem. Lett. 11, 1428–1434
```
(2020).
```
45. H. Yang, Y. Liu, J. Hao, H. Tang, S. Ding, Z. Wang, F. Fang, D. Wu, W.
Zhang, and H. Liu, “Alloyed green-emitting CdZnSeS/ZnS quantum dots
with dense protective layers for stable lighting and display applications,”
```
ACS Appl. Mater. Interfaces 13, 32217–32225 (2021).
```
46. Q. Yong, J. Chang, Q. Liu, F. Jiang, D. Wei, and H. Li, “Matt polyurethane
```
coating: correlation of surface roughness on measurement length and
```
```
gloss,” Polymers 12, 326 (2020).
```
47. M. Kamal, Z. Tang, and T. Huang, “Morphological characterization of PE
blown films by atomic force microscopy,” Int. Polym. Proc. 16, 376–387
```
(2022).
```
48. A. Agrawal and Y. Tchoe, “Scaling study of molecular beam epitaxy
grown InAs/Al2 O3 films using atomic force microscopy,” Thin Solid Films
```
709, 138204 (2020).
```
49. M. F. Schubert, J. Q. Xi, J. K. Kim, and E. F. Schubert, “Distributed Bragg
reflector consisting of high- and low-refractive-index thin film layers
```
made of the same material,” Appl. Phys. Lett. 90, 141115 (2007).
```
50. C. Zhang, R. ElAfandy, and J. Han, “Distributed Bragg reflectors for
GaN-based vertical-cavity surface-emitting lasers,” Appl. Sci. 9, 1593
```
(2019).
```
51. J. Liu, D. Liu, Y. Shen, X. Yang, C. Zhao, R. Chen, Z. Yang, J. Liu, J. Ma,
and H. Xiao, “Fabrication and applications of wafer-scale nanoporous
GaN near-infrared distributed Bragg reflectors,” Opt. Mater. 107, 110093
```
(2020).
```
52. T. Lin, J. Xie, T. Zhang, J. Li, H. Xie, and Y. Duan, “Studies on the
material and photoluminescence characteristics of the structure of
Al0.9 Ga0.1 As/GaAs DBR with varied doping,” J. Electron. Mater. 52,
```
730–737 (2023).
```
53. P. Li, Y. Zhang, Y. Yu, X. Han, L. Yan, G. Deng, and B. Zhang,
“Optimization design and preparation of near ultraviolet AlGaN/GaN
Research Article Vol. 10, No. 11 / November 2023 / Optica 1566
distributed Bragg reflectors,” Superlattices Microstruct. 122, 661–666
```
(2018).
```
54. Y. C. Shih and F. G. Shi, “Quantum dot based enhancement or elimina-
tion of color filters for liquid crystal display,” IEEE J. Sel. Top. Quantum
```
Electron. 23, 1–4 (2017).
```
55. Y. Aya and K. Ukai, “How color break-up occurs in the human-visual
```
system: the mechanism of the color break-up phenomenon,” J. Soc. Inf.
```
```
Disp. 14, 1127–1133 (2006).
```
56. S. Lin, G. Tan, J. Yu, E. Chen, Y. Weng, X. Zhou, S. Xu, Y. Ye, Q. Yan, and
T. Guo, “Multi-primary-color quantum-dot down-converting films for
```
display applications,” Opt. Express 27, 28480–28493 (2019).
```
57. R. Zhu, Z. Luo, H. Chen, Y. Dong, and S. T. Wu, “Realizing Rec. 2020
color gamut with quantum dot displays,” Opt. Express 23, 23680–23693
```
(2015).
```
58. I. J. Plante, A. Barron, J. Yamanaga, M. Bautista, J. Tillman, X. Wang, H.
Antoniadis, and J. Yurek, “Quantum dot color conversion for displays,”
```
SID Symp. Dig. Tech. Pap. 54, 792–794 (2023).
```
59. M. A. Triana, E. L. Hsiang, C. C. Zhang, Y. J. Dong, and S. T. Wu,
“Luminescent nanomaterials for energy efficient display and
```
healthcare,” ACS Energy Lett. 7, 1001–1020 (2022).
```

---
> **METADATA (NEXUS SEMANTIC TAGS)**: [database, ui-ux, performance, tdd, vcs, api]
