Đây là một **module TypeScript (Models.ts)**, nằm trong thư mục `resources/js` của một ứng dụng Laravel + Inertia/Vue/React.
Nhiệm vụ của nó là **khai báo danh sách các mô hình AI mà giao diện frontend sẽ cho phép người dùng chọn**.
Ta phân tích chi tiết:

---

## 1️⃣ Cấu trúc file

```ts
export const MODELS = [
  { id: "kimi-k2", label: "Moonshot Kimi K2 (instruct)" },
  { id: "meta-llama/llama-4-scout-17b-16e-instruct", label: "Llama-4 Scout 17B (Groq)" },
  { id: "llama-3.1-8b-instant", label: "Llama-3.1-8B Instant" },
  { id: "deepseek-r1-distill-llama-70b", label: "DeepSeek R1-Distill-Llama-70B" },
  { id: "llama-3.3-70b-versatile", label: "Llama-3.3-70B Versatile" },
];

export const DEFAULT_MODEL = "kimi-k2";
```

---

## 2️⃣ `MODELS` – Mảng danh sách mô hình

* Đây là một **array** các **object** (kiểu `{id: string, label: string}`).
* Mỗi object mô tả một mô hình ngôn ngữ (LLM) mà hệ thống hỗ trợ:

  * `id` : **mã nội bộ/tên kỹ thuật** mà backend sử dụng khi gọi API (ví dụ truyền vào `$req->string('model')` của PHP controller).
  * `label` : **chuỗi hiển thị** cho người dùng trên giao diện (ví dụ dropdown menu).

Ý nghĩa từng phần tử:

| id                                            | label                             | Ghi chú                                                                |
| --------------------------------------------- | --------------------------------- | ---------------------------------------------------------------------- |
| `"kimi-k2"`                                   | `"Moonshot Kimi K2 (instruct)"`   | Một mô hình từ Moonshot (Kimi) tối ưu cho instruction-following        |
| `"meta-llama/llama-4-scout-17b-16e-instruct"` | `"Llama-4 Scout 17B (Groq)"`      | Mô hình Llama-4 Scout 17B do Groq phục vụ                              |
| `"llama-3.1-8b-instant"`                      | `"Llama-3.1-8B Instant"`          | Phiên bản nhỏ, phản hồi nhanh                                          |
| `"deepseek-r1-distill-llama-70b"`             | `"DeepSeek R1-Distill-Llama-70B"` | Mô hình distillation của DeepSeek                                      |
| `"llama-3.3-70b-versatile"`                   | `"Llama-3.3-70B Versatile"`       | Mô hình Llama 3.3 70B đa năng (thường dùng mặc định trong backend PHP) |

> Ở phía frontend, ví dụ một `<select>` sẽ lặp qua `MODELS` để render danh sách lựa chọn.

---

## 3️⃣ `DEFAULT_MODEL` – Giá trị mặc định

```ts
export const DEFAULT_MODEL = "kimi-k2";
```

* Đây là **id** của mô hình sẽ được **chọn sẵn** khi giao diện khởi tạo, nếu người dùng chưa chọn gì.
* Tương ứng với phần tử đầu tiên của `MODELS`.

---

## 4️⃣ Liên kết với backend Laravel

Trước đó, trong `ChatController` (PHP), ta thấy:

```php
$model  = $req->string('model')->toString() ?: 'llama-3.3-70b-versatile';
```

Điều này có nghĩa:

* Khi frontend gọi API `/api/chat`:

  * Nếu request body có `"model": "<id>"`, backend sẽ dùng chính xác id đó.
  * Nếu **không** gửi, backend sẽ mặc định `"llama-3.3-70b-versatile"`.
* Trong khi đó, frontend mặc định `"kimi-k2"`.
  ⇒ Nếu người dùng giữ nguyên mặc định, frontend sẽ gửi `"model":"kimi-k2"`, và backend sẽ dùng nó.

---

## 5️⃣ Quy trình vận hành điển hình

1. Giao diện tải và hiển thị danh sách `MODELS` trong một dropdown.
2. Người dùng chọn mô hình, hoặc giữ nguyên `DEFAULT_MODEL`.
3. Khi nhấn “Gửi”, frontend POST tới `/api/chat`:

   ```json
   {
     "model": "kimi-k2",
     "messages": [ ... ]
   }
   ```
4. `ChatController` nhận và chuyển tiếp tới dịch vụ AI tương ứng.

---

## 6️⃣ Tóm tắt

File `resources/js/Models.ts`:

* **Mục đích**: Liệt kê các mô hình AI sẵn dùng trên giao diện và định nghĩa mô hình mặc định.
* **Tác dụng thực tế**: Là dữ liệu tĩnh (config) giúp đồng bộ lựa chọn mô hình giữa frontend và backend.
* **Mối liên hệ**: `id` trong `MODELS` khớp với tham số `model` mà PHP controller gửi đến API Groq/OpenAI.
