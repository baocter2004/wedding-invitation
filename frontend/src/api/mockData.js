export const mockData = {
  users: [
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Customer User', email: 'customer@example.com', role: 'customer', status: 'active' },
  ],
  templates: [
    {
      id: 1,
      code: 'traditional',
      name: 'Truyền Thống Đỏ',
      category: 'traditional',
      component_name: 'traditional',
      default_config_json: {
        primary_color: '#B91C1C',
        secondary_color: '#FFF1D6',
        font_heading: 'Playfair Display',
        font_body: 'Inter'
      },
      supported_sections_json: ['hero', 'intro', 'couple', 'events', 'gallery', 'bank', 'rsvp'],
      thumbnail_path: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop',
      preview_image_path: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop',
      is_premium: false,
      price: 0,
      status: 'active',
    },
    {
      id: 2,
      code: 'modern',
      name: 'Tối Giản Trắng',
      category: 'minimalist',
      component_name: 'modern',
      default_config_json: {
        primary_color: '#111827',
        secondary_color: '#FFFFFF',
        font_heading: 'Playfair Display',
        font_body: 'Inter'
      },
      supported_sections_json: ['hero', 'intro', 'couple', 'events', 'bank', 'rsvp'],
      thumbnail_path: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop',
      preview_image_path: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop',
      is_premium: false,
      price: 0,
      status: 'active',
    },
    {
      id: 3,
      code: 'emerald',
      name: 'Hiện Đại Lục Bảo',
      category: 'modern',
      component_name: 'emerald',
      default_config_json: {
        primary_color: '#064E3B',
        secondary_color: '#F4F7F6',
        font_heading: 'Playfair Display',
        font_body: 'Be Vietnam Pro'
      },
      supported_sections_json: ['hero', 'intro', 'events', 'gallery', 'bank', 'rsvp'],
      thumbnail_path: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop',
      preview_image_path: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop',
      is_premium: false,
      price: 0,
      status: 'active',
    }
  ],
  weddings: [
    {
      id: 1,
      user_id: 2,
      template_id: 3,
      slug: 'minh-anh-hoang-nam',
      title: 'Minh Anh & Hoàng Nam',
      bride_name: 'Minh Anh',
      groom_name: 'Hoàng Nam',
      bride_full_name: 'Nguyễn Thị Minh Anh',
      groom_full_name: 'Trần Hoàng Nam',
      bride_phone: '0987654321',
      groom_phone: '0123456789',
      bride_father_name: 'Nguyễn Văn A',
      bride_mother_name: 'Trần Thị B',
      groom_father_name: 'Trần Văn C',
      groom_mother_name: 'Lê Thị D',
      cover_image_path: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
      intro_text: 'Tình yêu không phải là tìm thấy một ai đó hoàn hảo, mà là học cách nhìn thấy những điều tuyệt vời từ một người không hoàn hảo.',
      love_story: 'Chúng tôi quen nhau vào một ngày mùa thu nắng vàng tại ngôi trường đại học. Từ những người bạn xa lạ, chúng tôi đã cùng nhau đi qua biết bao kỷ niệm vui buồn...',
      wedding_date: '2026-12-20',
      lunar_date_text: 'Ngày 12 tháng 11 năm Bính Ngọ',
      music_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      language: 'vi',
      theme_config_json: {
        primary_color: '#2D4F1E',
        secondary_color: '#FDFCF8',
        accent_color: '#A3B18A',
        font_heading: 'Playfair Display',
        font_body: 'Inter'
      },
      status: 'published',
      is_public: true,
      hide_watermark: false,
    }
  ],
  wedding_events: [
    {
      id: 1,
      wedding_id: 1,
      event_type: 'ceremony',
      title: 'Lễ Thành Hôn',
      event_time: '2026-12-20 11:30:00',
      venue_name: 'Trung tâm tiệc cưới Trống Đồng',
      address: '123 Cầu Giấy, Hà Nội',
      map_url: 'https://maps.google.com/?q=Trống+Đồng+Palace',
      latitude: 21.0285,
      longitude: 105.7891,
      note: 'Trang phục: Trắng, Kem, Xanh lá',
      sort_order: 1
    },
    {
      id: 2,
      wedding_id: 1,
      event_type: 'party',
      title: 'Tiệc Giao Lưu',
      event_time: '2026-12-20 18:00:00',
      venue_name: 'Khách sạn JW Marriott',
      address: '8 Đỗ Đức Dục, Mễ Trì, Nam Từ Liêm, Hà Nội',
      map_url: 'https://maps.google.com/?q=JW+Marriott+Hotel+Hanoi',
      latitude: 21.0091,
      longitude: 105.7876,
      note: 'Rất hân hạnh được đón tiếp!',
      sort_order: 2
    }
  ],
  wedding_photos: [
    { id: 1, wedding_id: 1, image_path: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop', caption: 'Ảnh cưới ngoại cảnh', sort_order: 1 },
    { id: 2, wedding_id: 1, image_path: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop', caption: 'Khoảnh khắc hạnh phúc', sort_order: 2 },
    { id: 3, wedding_id: 1, image_path: 'https://images.unsplash.com/photo-1544833058-e70f9ca2bdc5?q=80&w=1974&auto=format&fit=crop', caption: 'Bó hoa cưới', sort_order: 3 },
    { id: 4, wedding_id: 1, image_path: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop', caption: 'Nụ cười rạng ngời', sort_order: 4 },
    { id: 5, wedding_id: 1, image_path: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop', caption: 'Pre-wedding', sort_order: 5 },
    { id: 6, wedding_id: 1, image_path: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop', caption: 'Chú rể', sort_order: 6 },
  ],
  wedding_bank_accounts: [
    {
      id: 1,
      wedding_id: 1,
      owner_name: 'NGUYEN THI MINH ANH',
      bank_name: 'Vietcombank',
      bank_code: 'VCB',
      account_number: '012345678910',
      qr_image_path: 'https://img.vietqr.io/image/vcb-012345678910-compact.jpg',
      transfer_note: 'Mừng cưới Minh Anh',
      is_active: true,
      sort_order: 1
    },
    {
      id: 2,
      wedding_id: 1,
      owner_name: 'TRAN HOANG NAM',
      bank_name: 'MB Bank',
      bank_code: 'MB',
      account_number: '9876543210',
      qr_image_path: 'https://img.vietqr.io/image/mb-9876543210-compact.jpg',
      transfer_note: 'Mừng cưới Hoàng Nam',
      is_active: true,
      sort_order: 2
    }
  ],
  wedding_rsvps: [
    { id: 1, wedding_id: 1, guest_name: 'Nguyễn Tuấn', attendance_status: 'attending', guest_count: 2, message: 'Chúc hai bạn trăm năm hạnh phúc!' }
  ],
  wedding_wishes: [
    { id: 1, wedding_id: 1, guest_name: 'Hoàng Tuấn Anh', message: 'Chúc hai bạn mãi mãi hạnh phúc! Một khởi đầu mới tràn đầy niềm vui và sự sẻ chia.', created_at: '2026-05-01T10:00:00Z' },
    { id: 2, wedding_id: 1, guest_name: 'Minh Thư', message: 'Sớm có quý tử nhé hai bạn! Buổi lễ thật sự rất xúc động.', created_at: '2026-05-02T14:30:00Z' },
    { id: 3, wedding_id: 1, guest_name: 'Gia đình Bác Ba', message: 'Chúc mừng hạnh phúc hai cháu. Chúc hai cháu trăm năm tình viên mãn, bạc đầu nghĩa phu thê.', created_at: '2026-05-03T09:15:00Z' }
  ]
};
