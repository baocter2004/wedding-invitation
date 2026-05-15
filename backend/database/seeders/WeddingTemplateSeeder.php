<?php

namespace Database\Seeders;

use App\Models\WeddingTemplate;
use Illuminate\Database\Seeder;

class WeddingTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $templates = [
            [
                'code' => 'minimal_white',
                'name' => 'Minimal White',
                'category' => 'minimal',
                'component_name' => 'MinimalWhiteTemplate',
                'default_config_json' => [
                    'primary_color' => '#FFFFFF',
                    'secondary_color' => '#F7F7F7',
                    'font_heading' => 'Playfair Display',
                    'font_body' => 'Inter',
                    'sections' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                ],
                'supported_sections_json' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                'version' => '1.0.0',
                'is_featured' => true,
                'is_default' => true,
                'is_premium' => false,
                'price' => 0,
                'status' => 'active',
                'sort_order' => 1,
            ],
            [
                'code' => 'traditional_red',
                'name' => 'Traditional Red',
                'category' => 'traditional',
                'component_name' => 'TraditionalRedTemplate',
                'default_config_json' => [
                    'primary_color' => '#B91C1C',
                    'secondary_color' => '#FFF1D6',
                    'font_heading' => 'Playfair Display',
                    'font_body' => 'Inter',
                    'sections' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                ],
                'supported_sections_json' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                'version' => '1.0.0',
                'is_featured' => false,
                'is_default' => false,
                'is_premium' => false,
                'price' => 0,
                'status' => 'active',
                'sort_order' => 2,
            ],
            [
                'code' => 'emerald_modern',
                'name' => 'Emerald Modern',
                'category' => 'modern',
                'component_name' => 'EmeraldModernTemplate',
                'default_config_json' => [
                    'primary_color' => '#064E3B',
                    'secondary_color' => '#F4F7F6',
                    'font_heading' => 'Playfair Display',
                    'font_body' => 'Be Vietnam Pro',
                    'sections' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                ],
                'supported_sections_json' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                'version' => '1.0.0',
                'is_featured' => true,
                'is_default' => false,
                'is_premium' => false,
                'price' => 0,
                'status' => 'active',
                'sort_order' => 3,
            ],
            [
                'code' => 'floral_pastel',
                'name' => 'Floral Pastel',
                'category' => 'floral',
                'component_name' => 'FloralPastelTemplate',
                'default_config_json' => [
                    'primary_color' => '#D98BA5',
                    'secondary_color' => '#FFF7F9',
                    'font_heading' => 'Playfair Display',
                    'font_body' => 'Inter',
                    'sections' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                ],
                'supported_sections_json' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                'version' => '1.0.0',
                'is_featured' => true,
                'is_default' => false,
                'is_premium' => false,
                'price' => 0,
                'status' => 'active',
                'sort_order' => 4,
            ],
            [
                'code' => 'luxury_gold',
                'name' => 'Luxury Gold',
                'category' => 'luxury',
                'component_name' => 'LuxuryGoldTemplate',
                'default_config_json' => [
                    'primary_color' => '#C8A951',
                    'secondary_color' => '#111111',
                    'font_heading' => 'Cormorant Garamond',
                    'font_body' => 'Inter',
                    'sections' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                ],
                'supported_sections_json' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                'version' => '1.0.0',
                'is_featured' => true,
                'is_default' => false,
                'is_premium' => true,
                'price' => 199000,
                'status' => 'active',
                'sort_order' => 5,
            ],
            [
                'code' => 'modern_photo_story',
                'name' => 'Modern Photo Story',
                'category' => 'modern',
                'component_name' => 'ModernPhotoStoryTemplate',
                'default_config_json' => [
                    'primary_color' => '#1F2937',
                    'secondary_color' => '#F9FAFB',
                    'font_heading' => 'Playfair Display',
                    'font_body' => 'Inter',
                    'sections' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                ],
                'supported_sections_json' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
                'version' => '1.0.0',
                'is_featured' => false,
                'is_default' => false,
                'is_premium' => true,
                'price' => 299000,
                'status' => 'active',
                'sort_order' => 6,
            ],
        ];

        foreach ($templates as $template) {
            WeddingTemplate::create($template);
        }
    }
}
