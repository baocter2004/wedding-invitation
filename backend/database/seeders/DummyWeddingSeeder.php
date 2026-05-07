<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Wedding;
use App\Models\WeddingTemplate;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DummyWeddingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customer = User::where('role', 'customer')->first();
        $template = WeddingTemplate::where('code', 'floral_pastel')->first();

        if (!$customer || !$template) {
            return;
        }

        // Create a published wedding
        $wedding = Wedding::create([
            'user_id' => $customer->id,
            'template_id' => $template->id,
            'slug' => 'minh-anh-hoang-nam',
            'title' => 'Minh Anh & Hoàng Nam',
            'bride_name' => 'Minh Anh',
            'groom_name' => 'Hoàng Nam',
            'bride_full_name' => 'Nguyễn Thị Minh Anh',
            'groom_full_name' => 'Trần Hoàng Nam',
            'bride_phone' => '0987654321',
            'groom_phone' => '0123456789',
            'bride_father_name' => 'Nguyễn Văn A',
            'bride_mother_name' => 'Trần Thị B',
            'groom_father_name' => 'Trần Văn C',
            'groom_mother_name' => 'Lê Thị D',
            'cover_image_path' => '/storage/dummies/cover.jpg',
            'intro_text' => 'Trân trọng kính mời quý khách đến dự lễ thành hôn của chúng tôi.',
            'love_story' => 'Chúng tôi quen nhau vào một ngày mùa thu nắng vàng...',
            'wedding_date' => '2026-12-20',
            'lunar_date_text' => 'Ngày 12 tháng 11 năm Bính Ngọ',
            'status' => 'published',
            'is_public' => true,
            'published_at' => now(),
        ]);

        // Create events
        $wedding->events()->create([
            'event_type' => 'ceremony',
            'title' => 'Lễ Thành Hôn',
            'event_time' => '2026-12-20 11:30:00',
            'venue_name' => 'Trung tâm tiệc cưới Trống Đồng',
            'address' => '123 Cầu Giấy, Hà Nội',
            'sort_order' => 1,
        ]);

        $wedding->events()->create([
            'event_type' => 'party',
            'title' => 'Tiệc Giao Lưu',
            'event_time' => '2026-12-20 18:00:00',
            'venue_name' => 'Khách sạn JW Marriott',
            'address' => '8 Đỗ Đức Dục, Mễ Trì, Nam Từ Liêm, Hà Nội',
            'sort_order' => 2,
        ]);

        // Create photos
        for ($i = 1; $i <= 6; $i++) {
            $wedding->photos()->create([
                'image_path' => "/storage/dummies/gallery{$i}.jpg",
                'caption' => "Khoảnh khắc tuyệt vời {$i}",
                'sort_order' => $i,
            ]);
        }

        // Create bank accounts
        $wedding->bankAccounts()->create([
            'owner_name' => 'NGUYEN THI MINH ANH',
            'bank_name' => 'Vietcombank',
            'account_number' => '012345678910',
            'is_active' => true,
        ]);

        $wedding->bankAccounts()->create([
            'owner_name' => 'TRAN HOANG NAM',
            'bank_name' => 'Techcombank',
            'account_number' => '190333444555',
            'is_active' => true,
        ]);

        // Create RSVPs
        $wedding->rsvps()->create([
            'guest_name' => 'Nguyễn Tuấn',
            'phone' => '0912345678',
            'side' => 'groom',
            'attendance_status' => 'attending',
            'guest_count' => 2,
            'message' => 'Chúc hai bạn trăm năm hạnh phúc!',
            'submitted_at' => now(),
        ]);

        $wedding->rsvps()->create([
            'guest_name' => 'Lê Mai',
            'phone' => '0988777666',
            'side' => 'bride',
            'attendance_status' => 'not_attending',
            'guest_count' => 0,
            'message' => 'Tiếc quá mình đang công tác xa không tham dự được. Chúc hai bạn vui vẻ nhé!',
            'submitted_at' => now(),
        ]);

        // Create Wishes
        $wedding->wishes()->create([
            'guest_name' => 'Hoàng Tuấn Anh',
            'message' => 'Chúc hai bạn mãi mãi hạnh phúc!',
            'is_approved' => true,
        ]);

        $wedding->wishes()->create([
            'guest_name' => 'Người bạn cũ',
            'message' => 'Một tình yêu đẹp đã đơm hoa kết trái. Chúc mừng hạnh phúc!',
            'is_approved' => true,
        ]);

        // Create a draft wedding
        Wedding::create([
            'user_id' => $customer->id,
            'template_id' => $template->id,
            'title' => 'Đám cưới nhỏ của chúng mình',
            'bride_name' => 'Minh Anh',
            'groom_name' => 'Hoàng Nam',
            'status' => 'draft',
            'is_public' => false,
        ]);
    }
}
