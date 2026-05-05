# SKILL: WEB3 & BLOCKCHAIN STANDARDS (Human-AI Nexus)

Dokumen ini berisi standar teknis untuk pengembangan blockchain yang aman dan legal.

## 1. Keamanan Smart Contract (Contract Security)
- **Vulnerability Checks**: Selalu periksa terhadap Reentrancy, Overflow/Underflow, dan Timestamp Dependence.
- **Audit Tools**: Gunakan static analysis tools (seperti Slither atau Mythril) jika tersedia dalam lingkungan eksekusi.
- **Access Control**: Terapkan standar `Ownable` atau `AccessControl` dari OpenZeppelin.

## 2. Optimasi Gas (Gas Optimization)
- Hindari penggunaan loop yang tidak perlu pada array yang dinamis.
- Gunakan tipe data yang paling efisien (`uint8` vs `uint256` berdasarkan konteks storage).
- Emit event untuk pencatatan data yang tidak perlu disimpan di state blockchain.

## 3. Kepatuhan Hukum (Legal Compliance)
- **KYC/AML Alignment**: Jika kontrak melibatkan aset finansial, pastikan ada mekanisme untuk integrasi KYC jika diminta oleh regulasi.
- **Smart Contract as Legal Agreement**: Pastikan komentar di dalam kode mencerminkan niat hukum yang ada di dokumen `legal/`.

## 4. Prosedur Deployment
- **Jaringan**: Hanya gunakan Testnet (Sepolia, Mumbai, dll.) untuk pengembangan awal.
- **Verification**: Kontrak yang sudah dideploy harus diverifikasi source-code nya di Explorer (Etherscan, dll.).

---
*Dokumen ini adalah referensi teknis. Untuk aturan perilaku AI, lihat `agent/web3-specialist.md`.*
