import type { CategoryConfig, DeviceKind, Product, Question, Review } from '../types';
import { formatPrice } from '../lib/format';
import { seeded } from '../lib/random';

const HOUR = 3600 * 1000;
const DAY = 24 * HOUR;

const reviewPool: Omit<Review, 'id' | 'createdAt'>[] = [
  { author: 'Tạ Quang Minh', rating: 5, content: 'Rất đáng mua, tôi đã mua nhiều sản phẩm bên MaoShop, nhân viên tư vấn nhiệt tình.', verified: true },
  { author: 'Đỗ Thiện Minh', rating: 5, content: 'Máy cầm chắc tay, hoàn thiện đẹp. Dùng cả ngày không thấy nóng, pin trâu hơn máy cũ nhiều.', verified: true, hasImage: true },
  { author: 'Nguyễn Ngọc Hoàng Anh', rating: 5, content: 'Đặt trước được giao đúng hẹn, đóng gói cẩn thận. Hàng chính hãng nguyên seal.' },
  { author: 'Lê Nhiên', rating: 4, content: 'Sản phẩm tốt, giao nhanh trong ngày. Trừ 1 sao vì phải chờ cửa hàng gọi xác nhận hơi lâu.', verified: true },
  { author: 'Lê Vy', rating: 5, content: 'Màu ngoài đời đẹp hơn ảnh, mua đợt này được ưu đãi tốt.', tags: ['Hiệu năng siêu mạnh mẽ', 'Thời lượng pin cực khủng'], hasImage: true },
  { author: 'Phạm Gia Bảo', rating: 4, content: 'Dùng ổn định, màn hình đẹp. Giá hơi cao nhưng xứng đáng.' },
  { author: 'Trần Thu Hà', rating: 5, content: 'Trả góp 0% duyệt nhanh, thủ tục đơn giản. Sẽ ủng hộ shop tiếp.', verified: true },
  { author: 'Võ Minh Khang', rating: 3, content: 'Máy ổn nhưng phụ kiện đi kèm hơi ít, phải mua thêm củ sạc.' },
];

const questionPool = [
  { author: 'Quốc Bình', content: 'Máy về chưa ạ, em đặt cọc từ tuần trước mà chưa thấy báo?' },
  { author: 'Hoàng Sương', content: 'Em có máy cũ 128GB muốn đổi lên máy này thì bù bao nhiêu ạ?' },
  { author: 'NT Thanh Thảo', content: 'Sản phẩm này có hỗ trợ trả góp không ạ, cần giấy tờ gì?' },
  { author: 'Nguyễn Phong Lưu', content: 'Bên mình có giao hàng tận nơi ở tỉnh không ạ?' },
  { author: 'Anh Tuấn', content: 'Kiểm tra giúp mình màu khác khi nào có hàng nhé.' },
];

function adminReply(product: Product, index: number): string {
  const replies = [
    `Dạ MaoShop xin chào anh/chị. Đơn đặt trước ${product.name} sẽ được giao theo thứ tự cọc, bên em sẽ gửi SMS thông báo khi có hàng ạ.`,
    `Dạ ${product.name} hiện có giá ${formatPrice(product.price)}. Anh/chị mang máy cũ đến cửa hàng để được định giá chính xác, trợ giá thu cũ lên đến 3 triệu ạ.`,
    `Dạ sản phẩm hỗ trợ trả góp 0% qua thẻ tín dụng kỳ hạn 3, 6, 9, 12 tháng, hoặc qua công ty tài chính chỉ cần CCCD ạ.`,
    'Dạ MaoShop giao hàng toàn quốc, miễn phí cho đơn từ 300.000đ. Nội thành Hà Nội và TP.HCM giao nhanh trong 2 giờ ạ.',
    'Dạ bên em đã ghi nhận, khi có hàng sẽ liên hệ lại anh/chị sớm nhất ạ.',
  ];
  return replies[index % replies.length];
}

export function getSampleReviews(product: Product): Review[] {
  const rand = seeded(product.id);
  const count = 3 + Math.floor(rand() * 4);
  const start = Math.floor(rand() * reviewPool.length);
  return Array.from({ length: count }, (_, i) => {
    const r = reviewPool[(start + i) % reviewPool.length];
    return { ...r, id: `s-${product.id}-r${i}`, createdAt: Date.now() - (i + 1) * (3 + Math.floor(rand() * 5)) * DAY };
  });
}

export function getSampleQuestions(product: Product): Question[] {
  const rand = seeded(`${product.id}-qa`);
  const count = 2 + Math.floor(rand() * 3);
  const offset = Math.floor(rand() * questionPool.length);
  return Array.from({ length: count }, (_, i) => {
    const q = questionPool[(offset + i) % questionPool.length];
    const createdAt = Date.now() - (i * 4 + 2) * HOUR;
    return {
      id: `s-${product.id}-q${i}`,
      author: q.author,
      content: q.content,
      createdAt,
      replies: [{ id: `s-${product.id}-q${i}-a`, author: 'Quản Trị Viên', isAdmin: true, content: adminReply(product, i), createdAt: createdAt + 20 * 60 * 1000 }],
    };
  });
}

const categoryQuestionPool = [
  { author: 'Huỳnh Thái Tuấn', content: (n: string) => `Mình muốn mua ${n} tầm 25 triệu trở xuống, dùng cho học tập và giải trí thì nên chọn mẫu nào ạ?` },
  { author: 'Nguyễn Hoàng Dũng', content: (n: string) => `Cho em hỏi ${n} nào đang có ưu đãi tốt nhất trong tháng này ạ?` },
  { author: 'Đặng Phước Nguyên', content: (n: string) => `Shop có trả góp 0% cho ${n} không, cần giấy tờ gì ạ?` },
  { author: 'Huỳnh Đức Duy', content: (n: string) => `Em ở tỉnh thì đặt ${n} online bao lâu nhận được hàng ạ?` },
];

/** Sample Q&A shown on a category page. */
export function getCategoryQuestions(config: CategoryConfig): Question[] {
  const name = config.title.toLowerCase();
  return categoryQuestionPool.map((q, i) => {
    const createdAt = Date.now() - (i * 2 + 1) * DAY;
    return {
      id: `s-cat-${config.id}-q${i}`,
      author: q.author,
      content: q.content(name),
      createdAt,
      replies: [
        {
          id: `s-cat-${config.id}-q${i}-a`,
          author: 'Quản Trị Viên',
          isAdmin: true,
          content: `Dạ MaoShop xin chào anh/chị. Anh/chị có thể dùng bộ lọc "Nhu cầu sử dụng" và "Xem theo giá" ngay trên trang để xem các mẫu ${name} phù hợp. Nếu cần tư vấn thêm, vui lòng gọi tổng đài 1800.2044 (miễn phí) ạ.`,
          createdAt: createdAt + 3 * HOUR,
        },
      ],
    };
  });
}

/** Criteria shown in "Đánh giá theo trải nghiệm". */
export function experienceCriteria(kind: DeviceKind): string[] {
  switch (kind) {
    case 'phone':
    case 'foldable':
    case 'tablet':
      return ['Hiệu năng', 'Thời lượng pin', 'Chất lượng camera'];
    case 'laptop':
    case 'monitor':
      return ['Hiệu năng', 'Màn hình', 'Thời lượng pin'];
    case 'tv':
      return ['Chất lượng hình ảnh', 'Âm thanh', 'Hệ điều hành'];
    case 'earbuds':
    case 'headphones':
    case 'speaker':
      return ['Chất lượng âm thanh', 'Thời lượng pin', 'Độ thoải mái'];
    default:
      return ['Chất lượng', 'Độ bền', 'Đúng mô tả'];
  }
}
