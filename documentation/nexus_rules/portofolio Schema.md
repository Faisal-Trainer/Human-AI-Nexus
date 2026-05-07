# Portfolio Schema — faisalyusra.my.id/portfolio

> JSON-LD tambahan untuk halaman `/portfolio`
> Di-inject via `@push('schemas')` di `portfolio.blade.php`
> Merujuk `@id` yang sudah ada di `layout/app.blade.php`

---

## Cara Pakai

Taruh di bagian **bawah** file `resources/views/portfolio.blade.php` (atau nama view portofoliomu):

```blade
@push('schemas')
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://faisalyusra.my.id/portfolio#webpage",
      "url": "https://faisalyusra.my.id/portfolio",
      "name": "Portofolio | Faisal Yusra — Web Developer Bukittinggi",
      "description": "Kumpulan proyek web application, IT support, dan solusi digital yang telah dikerjakan untuk UMKM dan bisnis di Bukittinggi dan Sumatera Barat.",
      "publisher": {
        "@id": "https://faisalyusra.my.id/#service"
      },
      "author": {
        "@id": "https://faisalyusra.my.id/#person"
      },
      "inLanguage": "id-ID"
    },
    {
      "@type": "ItemList",
      "@id": "https://faisalyusra.my.id/portfolio#list",
      "name": "Proyek Portofolio Faisal Yusra",
      "description": "Daftar proyek web application dan solusi digital untuk UMKM.",
      "url": "https://faisalyusra.my.id/portfolio",
      "author": {
        "@id": "https://faisalyusra.my.id/#person"
      },
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "CreativeWork",
            "name": "Nama Proyek 1",
            "description": "Deskripsi singkat proyek — apa yang dibangun, untuk siapa, teknologi apa.",
            "url": "https://faisalyusra.my.id/portfolio#proyek-1",
            "image": "https://faisalyusra.my.id/img/portfolio/proyek-1.webp",
            "dateCreated": "2024-01-01",
            "author": {
              "@id": "https://faisalyusra.my.id/#person"
            },
            "keywords": ["Laravel", "Livewire", "UMKM", "Web App"],
            "programmingLanguage": "PHP"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "CreativeWork",
            "name": "Nama Proyek 2",
            "description": "Deskripsi singkat proyek — apa yang dibangun, untuk siapa, teknologi apa.",
            "url": "https://faisalyusra.my.id/portfolio#proyek-2",
            "image": "https://faisalyusra.my.id/img/portfolio/proyek-2.webp",
            "dateCreated": "2024-06-01",
            "author": {
              "@id": "https://faisalyusra.my.id/#person"
            },
            "keywords": ["Filament", "Tailwind CSS", "Dashboard"],
            "programmingLanguage": "PHP"
          }
        }
      ]
    }
  ]
}
</script>
@endpush
```

---

## Kalau Portofolio Dinamis dari DB (Direkomendasikan)

Kalau data proyek disimpan di database, gunakan versi blade dinamis ini:

```blade
@push('schemas')
@php
    $listItems = $portfolios->map(function ($item, $index) {
        return [
            '@type' => 'ListItem',
            'position' => $index + 1,
            'item' => [
                '@type' => 'CreativeWork',
                'name' => $item->title,
                'description' => $item->excerpt ?? $item->description,
                'url' => url('/portfolio/' . $item->slug),
                'image' => asset('img/portfolio/' . $item->image),
                'dateCreated' => $item->created_at->format('Y-m-d'),
                'author' => ['@id' => 'https://faisalyusra.my.id/#person'],
                'keywords' => is_array($item->tags) ? $item->tags : explode(',', $item->tags),
                'programmingLanguage' => 'PHP',
            ],
        ];
    })->toArray();

    $portfolioSchema = [
        '@context' => 'https://schema.org',
        '@graph' => [
            [
                '@type' => 'CollectionPage',
                '@id' => 'https://faisalyusra.my.id/portfolio#webpage',
                'url' => 'https://faisalyusra.my.id/portfolio',
                'name' => 'Portofolio | Faisal Yusra — Web Developer Bukittinggi',
                'description' => 'Kumpulan proyek web application, IT support, dan solusi digital yang telah dikerjakan untuk UMKM dan bisnis di Bukittinggi dan Sumatera Barat.',
                'publisher' => ['@id' => 'https://faisalyusra.my.id/#service'],
                'author' => ['@id' => 'https://faisalyusra.my.id/#person'],
                'inLanguage' => 'id-ID',
            ],
            [
                '@type' => 'ItemList',
                '@id' => 'https://faisalyusra.my.id/portfolio#list',
                'name' => 'Proyek Portofolio Faisal Yusra',
                'description' => 'Daftar proyek web application dan solusi digital untuk UMKM.',
                'url' => 'https://faisalyusra.my.id/portfolio',
                'author' => ['@id' => 'https://faisalyusra.my.id/#person'],
                'itemListElement' => $listItems,
            ],
        ],
    ];

    echo '<script type="application/ld+json">'
        . json_encode($portfolioSchema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
        . '</script>';
@endphp
@endpush
```

---

## Penjelasan Tiap Schema

| Schema           | Fungsi                                                             |
| ---------------- | ------------------------------------------------------------------ |
| `CollectionPage` | Memberitahu AI bahwa `/portfolio` adalah halaman kumpulan karya    |
| `ItemList`       | Mendaftarkan semua proyek sebagai list yang terstruktur            |
| `CreativeWork`   | Tiap proyek dikenali sebagai karya kreatif/teknis                  |
| `@id` (linked)   | Menghubungkan ke `#person` dan `#service` yang sudah ada di layout |

---

## Koneksi ke Schema yang Sudah Ada di `app.blade.php`

```
layout/app.blade.php
│
├── Person Schema          → @id: #person       (Muhammad Faisal Alyusra)
├── ProfessionalService    → @id: #service       (Faisal Yusra Digital)
└── WebPage Schema         → @id: [current]#webpage
        ↑
        │   @push('schemas') dari portfolio.blade.php
        │
        ├── CollectionPage → publisher: #service, author: #person
        └── ItemList       → author: #person
                └── CreativeWork (tiap proyek)
```

> **Tidak perlu redeclare** `Person` dan `ProfessionalService` di sini —
> cukup referensikan via `"@id"` karena sudah ada di `@graph` global.

---

## Test & Validasi

Setelah deploy, validasi di:

- **Schema.org Validator** → https://validator.schema.org
- **Google Rich Results Test** → https://search.google.com/test/rich-results
- **Paste URL** → `https://faisalyusra.my.id/portfolio`

---

_Dibuat berdasarkan pola `layout/app.blade.php` · Mei 2026_
