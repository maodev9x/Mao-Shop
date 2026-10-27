# Môi trường dev và lệnh thường dùng

## Lệnh

```bash
npm install        # cài dependencies
npm run dev        # dev server tại http://localhost:5173
npm run build      # tsc --noEmit + vite build
npm run typecheck  # chỉ kiểm tra type
npm run preview    # chạy bản build tại http://localhost:4173
```

## Phiên bản Node

- Cần Node ≥ 18. Node mặc định trên máy này là **10.16.3** (quá cũ, Vite và Tailwind v4 sẽ lỗi).
- Người dùng có thể chạy `nvm use 23.10.0`.
- Khi Claude chạy lệnh, gọi trực tiếp bản 23 mà **không** đổi phiên bản toàn cục:
  `export PATH="/c/Users/Kyberosc/AppData/Roaming/nvm/v23.10.0:$PATH"` (Git Bash).

## Hệ điều hành

Môi trường dev là Windows. Ưu tiên lệnh chạy được trên cả PowerShell và Git Bash.
