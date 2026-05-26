graph LR
A [scanning seluruh isi project ini]
B [jalankan nexus run]
C [ error ]
D [buatkan audit]
E [final ouput audit ]

A --> B
B -- NO --> C
C --> D
D --> A
B -- yes --> E
