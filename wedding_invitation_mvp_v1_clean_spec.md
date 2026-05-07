# Online Wedding Invitation Platform — MVP v1 Specification

## Laravel API + React Admin + React Customer/Public Frontend

> Purpose: This MVP v1 specification focuses on a web platform where both **admin** and **customer/client** use React. Laravel is used as a REST API backend. Admin does **not** use Filament in this version.

---

## 1. Product Goal

Build a web platform where customers can create online wedding invitations from prebuilt templates.

Customers can:

- Register and log in
- Choose an active wedding invitation template
- Create and edit a wedding invitation
- Input bride and groom information
- Add wedding events
- Upload cover image and gallery photos
- Add bank QR/account information
- Preview the invitation
- Publish or unpublish the invitation
- Share a public invitation link
- View RSVP and wishes submitted by guests

Admin can:

- Log in through the same React app
- Access a React admin dashboard
- Manage users
- Activate/deactivate/ban users
- Manage wedding templates
- Enable/disable/archive templates
- Upload template thumbnails, preview images, and template assets
- Manage all weddings
- View RSVP and wishes
- Approve/hide wishes

---

## 2. MVP v1 Scope

### Included in MVP v1

```text
1. Authentication
2. Role-based access control: admin/customer
3. React public pages
4. React customer dashboard
5. React admin dashboard
6. User management
7. Template management
8. Enable/disable/archive templates
9. Wedding invitation CRUD
10. Wedding events CRUD
11. Cover image and gallery upload
12. Bank QR/account management
13. Preview and publish/unpublish
14. Public wedding invitation page
15. Public RSVP submission
16. Public wishes submission
17. Customer view of RSVP/wishes
18. Admin view/manage RSVP/wishes
```

### Not Included in MVP v1

```text
1. Drag-and-drop editor
2. Online payment
3. Pricing plans
4. Orders/payments module
5. Studio/agency account
6. Guest invite-code system
7. Personalized guest invitation links
8. Custom domain
9. Zalo OA integration
10. SMS/email bulk sending
11. AI template generation
12. Complex multi-language management
13. Advanced analytics
14. Filament admin panel
```

> Important: Admin and customer/client both use React. Do not use Filament in MVP v1.

---

## 3. Recommended Architecture

```text
Backend:
- Laravel REST API
- Laravel Sanctum token-based authentication
- MySQL
- Laravel public storage for uploaded images
- Role-based authorization using middleware/policies

Frontend:
- ReactJS with Vite
- TailwindCSS
- React Router
- Axios
- React Hook Form
- React admin dashboard
- React customer dashboard
- React public wedding pages
```

Recommended app split:

```text
Laravel:
- REST API only
- Auth logic
- Database
- Upload handling
- Business logic
- Admin API endpoints
- Customer API endpoints
- Public API endpoints

React:
- Public landing page
- Public templates page
- Public wedding invitation page
- Auth pages
- Customer dashboard
- Admin dashboard
- Template rendering system
```

---

## 4. User Roles

MVP v1 implements only:

```text
admin:
- Access React admin dashboard
- Manage users
- Manage templates
- Manage weddings
- View RSVP and wishes
- Approve/hide wishes

customer:
- Create personal wedding invitations
- Edit own wedding invitations
- Publish/unpublish own wedding invitations
- View RSVP and wishes for own weddings
```

Do not implement `studio` role in MVP v1. It can be added later.

---

## 5. Core Database Tables

Implement these tables in MVP v1:

```text
users
wedding_templates
wedding_template_assets
weddings
wedding_events
wedding_photos
wedding_bank_accounts
wedding_rsvps
wedding_wishes
```

Do not implement these tables in MVP v1:

```text
studio_profiles
wedding_guests
plans
orders
payments
```

These can be added later when studio accounts, invite-code logic, and payment logic are needed.

---

## 6. Database Schema — DBML

Copy this schema into dbdiagram.io to view the ERD.

```dbml
Table users {
  id bigint [pk, increment]
  name varchar(255)
  email varchar(255) [unique]
  password varchar(255)
  phone varchar(30) [null]
  role varchar(30) [default: 'customer'] // admin, customer
  status varchar(30) [default: 'active'] // active, inactive, banned
  email_verified_at timestamp [null]
  remember_token varchar(100) [null]
  created_at timestamp
  updated_at timestamp
}

Table wedding_templates {
  id bigint [pk, increment]
  code varchar(100) [unique]
  name varchar(255)
  category varchar(100) [null] // minimal, floral, luxury, traditional, modern
  description text [null]

  thumbnail_path varchar(500) [null]
  preview_image_path varchar(500) [null]

  component_name varchar(255)

  default_config_json json [null]
  supported_sections_json json [null]

  version varchar(50) [default: '1.0.0']
  is_premium boolean [default: false]
  is_featured boolean [default: false]
  is_default boolean [default: false]

  price decimal(12,2) [default: 0]
  status varchar(30) [default: 'active'] // active, inactive, archived
  sort_order int [default: 0]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp [null]
}

Table wedding_template_assets {
  id bigint [pk, increment]
  template_id bigint [not null]
  asset_type varchar(100) // thumbnail, preview, background, decoration, mobile_preview, desktop_preview
  file_path varchar(500)
  alt_text varchar(255) [null]
  sort_order int [default: 0]
  created_at timestamp
  updated_at timestamp
}

Table weddings {
  id bigint [pk, increment]
  user_id bigint [not null]
  template_id bigint [not null]
  slug varchar(255) [unique, null]
  title varchar(255) [null]

  bride_name varchar(255)
  groom_name varchar(255)

  bride_full_name varchar(255) [null]
  groom_full_name varchar(255) [null]

  bride_phone varchar(30) [null]
  groom_phone varchar(30) [null]

  bride_father_name varchar(255) [null]
  bride_mother_name varchar(255) [null]
  groom_father_name varchar(255) [null]
  groom_mother_name varchar(255) [null]

  cover_image_path varchar(500) [null]
  intro_text text [null]
  love_story text [null]
  wedding_date date [null]
  lunar_date_text varchar(255) [null]

  music_url varchar(500) [null]
  language varchar(20) [default: 'vi']
  theme_config_json json [null]

  status varchar(30) [default: 'draft'] // draft, published, archived
  is_public boolean [default: false]
  hide_watermark boolean [default: false]

  published_at timestamp [null]
  expires_at timestamp [null]

  created_at timestamp
  updated_at timestamp
  deleted_at timestamp [null]
}

Table wedding_events {
  id bigint [pk, increment]
  wedding_id bigint [not null]
  event_type varchar(50) // groom_family, bride_family, ceremony, party, other
  title varchar(255)
  event_time datetime
  venue_name varchar(255) [null]
  address text [null]
  map_url varchar(1000) [null]
  latitude decimal(10,7) [null]
  longitude decimal(10,7) [null]
  note text [null]
  sort_order int [default: 0]
  created_at timestamp
  updated_at timestamp
}

Table wedding_photos {
  id bigint [pk, increment]
  wedding_id bigint [not null]
  image_path varchar(500)
  caption varchar(255) [null]
  sort_order int [default: 0]
  created_at timestamp
  updated_at timestamp
}

Table wedding_bank_accounts {
  id bigint [pk, increment]
  wedding_id bigint [not null]
  owner_name varchar(255)
  bank_name varchar(255) [null]
  bank_code varchar(100) [null]
  account_number varchar(100) [null]
  qr_image_path varchar(500) [null]
  transfer_note varchar(255) [null]
  is_active boolean [default: true]
  sort_order int [default: 0]
  created_at timestamp
  updated_at timestamp
}

Table wedding_rsvps {
  id bigint [pk, increment]
  wedding_id bigint [not null]

  guest_name varchar(255)
  phone varchar(30) [null]
  email varchar(255) [null]
  side varchar(50) [null] // bride, groom, friend, company, family, other

  attendance_status varchar(50) // attending, not_attending, maybe
  guest_count int [default: 1]
  message text [null]

  ip_address varchar(100) [null]
  user_agent text [null]
  submitted_at timestamp [null]

  created_at timestamp
  updated_at timestamp
}

Table wedding_wishes {
  id bigint [pk, increment]
  wedding_id bigint [not null]
  guest_name varchar(255)
  message text
  is_approved boolean [default: true]
  created_at timestamp
  updated_at timestamp
}

Ref: wedding_template_assets.template_id > wedding_templates.id

Ref: weddings.user_id > users.id
Ref: weddings.template_id > wedding_templates.id

Ref: wedding_events.wedding_id > weddings.id
Ref: wedding_photos.wedding_id > weddings.id
Ref: wedding_bank_accounts.wedding_id > weddings.id
Ref: wedding_rsvps.wedding_id > weddings.id
Ref: wedding_wishes.wedding_id > weddings.id
```

---

## 7. Model Relationships

```text
User has many Weddings

Wedding belongs to User
Wedding belongs to WeddingTemplate
Wedding has many WeddingEvents
Wedding has many WeddingPhotos
Wedding has many WeddingBankAccounts
Wedding has many WeddingRsvps
Wedding has many WeddingWishes

WeddingTemplate has many Weddings
WeddingTemplate has many WeddingTemplateAssets
WeddingTemplateAsset belongs to WeddingTemplate

WeddingEvent belongs to Wedding
WeddingPhoto belongs to Wedding
WeddingBankAccount belongs to Wedding
WeddingRsvp belongs to Wedding
WeddingWish belongs to Wedding
```

---

## 8. Business Rules

### 8.1 User Status

```text
active:
- User can log in and use the system.

inactive:
- User cannot log in.
- Existing public weddings remain public unless admin manually unpublishes them.

banned:
- User cannot log in.
- Current API tokens should be revoked.
- Admin should review whether to unpublish this user's weddings.
```

Login API must reject users where `status != active`.

### 8.2 Role Access

```text
admin:
- Can access /admin/* React routes.
- Can call /api/admin/* endpoints.
- Can manage all users, templates, weddings, RSVP, and wishes.

customer:
- Can access /customer/* React routes.
- Can call /api/my/* endpoints.
- Can manage only their own weddings and related records.
```

React route guards:

```text
PrivateRoute:
- Requires logged-in user.

AdminRoute:
- Requires logged-in user.
- Requires user.role = admin.

CustomerRoute:
- Requires logged-in user.
- Requires user.role = customer or admin if admin needs to impersonate/debug later.
```

### 8.3 Template Status

```text
active:
- Template is visible to customers.
- Customers can use it to create new weddings.

inactive:
- Template is hidden from customer template list.
- Customers cannot select it for new weddings.
- Existing weddings using this template should still render normally.

archived:
- Template is hidden from customer template list.
- Template is hidden from default admin list unless filtered.
- Existing weddings using this template should still render normally.
```

Customer template API must only return:

```text
status = active
```

Admin can update template status from the React admin dashboard.

### 8.4 Wedding Status

```text
draft:
- Not public.
- Only owner can view and edit.

published:
- Has public link.
- Guests can view.
- Guests can submit RSVP and wishes.

archived:
- Hidden from main customer dashboard by default.
- Public page should not accept new RSVP/wishes.
```

### 8.5 Publish Logic

When customer publishes a wedding:

```text
1. Validate required wedding data.
2. Generate unique slug if missing.
3. Set status = published.
4. Set is_public = true.
5. Set published_at = now() if empty.
```

When customer unpublishes a wedding:

```text
1. Set status = draft.
2. Set is_public = false.
```

### 8.6 Slug Logic

`weddings.slug` must be nullable because a customer can create a draft wedding before publishing.

```php
$table->string('slug')->nullable()->unique();
```

When publishing, generate slug from bride and groom names.

Example:

```text
minh-anh-hoang-nam
minh-anh-hoang-nam-2
minh-anh-hoang-nam-3
```

### 8.7 Public Wedding Logic

`GET /api/public/weddings/{slug}` should only return weddings where:

```text
status = published
is_public = true
deleted_at = null
```

Otherwise return `404`.

### 8.8 Template Rendering Rule

Do not store full HTML, CSS, or JavaScript template code in the database.

Use:

```text
React component + database config + template assets + wedding data
```

---

## 9. API Routes

### 9.1 Auth API

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

Login response should include:

```json
{
  "token": "plain_text_token",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin",
    "status": "active"
  }
}
```

### 9.2 Customer/Public Template API

Only return active templates.

```text
GET    /api/templates
GET    /api/templates/{id}
GET    /api/templates/by-code/{code}
```

### 9.3 Customer Wedding API

```text
GET    /api/my/weddings
POST   /api/my/weddings
GET    /api/my/weddings/{id}
PUT    /api/my/weddings/{id}
DELETE /api/my/weddings/{id}

POST   /api/my/weddings/{id}/publish
POST   /api/my/weddings/{id}/unpublish
```

### 9.4 Wedding Events API

```text
GET    /api/my/weddings/{weddingId}/events
POST   /api/my/weddings/{weddingId}/events
PUT    /api/my/weddings/{weddingId}/events/{eventId}
DELETE /api/my/weddings/{weddingId}/events/{eventId}
```

### 9.5 Wedding Photos API

```text
GET    /api/my/weddings/{weddingId}/photos
POST   /api/my/weddings/{weddingId}/photos
PUT    /api/my/weddings/{weddingId}/photos/{photoId}
DELETE /api/my/weddings/{weddingId}/photos/{photoId}
```

### 9.6 Bank Accounts API

```text
GET    /api/my/weddings/{weddingId}/bank-accounts
POST   /api/my/weddings/{weddingId}/bank-accounts
PUT    /api/my/weddings/{weddingId}/bank-accounts/{bankAccountId}
DELETE /api/my/weddings/{weddingId}/bank-accounts/{bankAccountId}
```

### 9.7 Customer RSVP and Wishes Dashboard API

```text
GET    /api/my/weddings/{weddingId}/rsvps
GET    /api/my/weddings/{weddingId}/wishes
```

### 9.8 Public Wedding API

```text
GET    /api/public/weddings/{slug}
POST   /api/public/weddings/{slug}/rsvp
POST   /api/public/weddings/{slug}/wishes
```

Apply throttling to public write endpoints:

```php
Route::middleware('throttle:10,1')->group(function () {
    Route::post('/public/weddings/{slug}/rsvp', [PublicWeddingController::class, 'submitRsvp']);
    Route::post('/public/weddings/{slug}/wishes', [PublicWeddingController::class, 'submitWish']);
});
```

### 9.9 Admin API

All routes require:

```text
auth:sanctum
role = admin
status = active
```

Dashboard:

```text
GET    /api/admin/dashboard
```

Users:

```text
GET    /api/admin/users
POST   /api/admin/users
GET    /api/admin/users/{id}
PUT    /api/admin/users/{id}
DELETE /api/admin/users/{id}
PATCH  /api/admin/users/{id}/status
PATCH  /api/admin/users/{id}/role
```

Templates:

```text
GET    /api/admin/templates
POST   /api/admin/templates
GET    /api/admin/templates/{id}
PUT    /api/admin/templates/{id}
DELETE /api/admin/templates/{id}
PATCH  /api/admin/templates/{id}/status
POST   /api/admin/templates/{id}/assets
DELETE /api/admin/templates/{id}/assets/{assetId}
```

Weddings:

```text
GET    /api/admin/weddings
GET    /api/admin/weddings/{id}
PUT    /api/admin/weddings/{id}
DELETE /api/admin/weddings/{id}
POST   /api/admin/weddings/{id}/publish
POST   /api/admin/weddings/{id}/unpublish
```

RSVPs:

```text
GET    /api/admin/rsvps
GET    /api/admin/weddings/{id}/rsvps
DELETE /api/admin/rsvps/{id}
```

Wishes:

```text
GET    /api/admin/wishes
GET    /api/admin/weddings/{id}/wishes
PATCH  /api/admin/wishes/{id}/approve
PATCH  /api/admin/wishes/{id}/hide
DELETE /api/admin/wishes/{id}
```

---

## 10. Admin React Dashboard

Use React for admin management in MVP v1.

### Admin pages

```text
/admin/dashboard
/admin/users
/admin/users/create
/admin/users/:id/edit
/admin/templates
/admin/templates/create
/admin/templates/:id/edit
/admin/weddings
/admin/weddings/:id
/admin/rsvps
/admin/wishes
```

### AdminDashboardPage should show

```text
- Total users
- Active users
- Total templates
- Active templates
- Total weddings
- Published weddings
- Total RSVP submissions
- Recent weddings
- Recent RSVP/wishes
```

### AdminUsers pages should allow admin to

```text
- List users
- Search by name/email/phone
- Filter by role/status
- Create user
- Edit user
- Change status: active, inactive, banned
- Change role: admin, customer
- View user's weddings
```

### AdminTemplates pages should allow admin to

```text
- List templates
- Search by name/code/category
- Filter by status/category/is_premium/is_featured
- Create template
- Edit template
- Upload thumbnail
- Upload preview image
- Upload template assets
- Update component_name
- Update default_config_json
- Update supported_sections_json
- Set active/inactive/archived
- Set sort_order
- Set is_default/is_featured/is_premium
```

### AdminWeddings pages should allow admin to

```text
- List weddings
- Search by bride/groom/title/slug
- Filter by status/is_public/template/customer
- View wedding details
- Edit wedding
- Publish/unpublish manually if needed
- Soft delete wedding
```

### AdminRSVPs page should allow admin to

```text
- List RSVP submissions
- Filter by wedding and attendance_status
- View guest name, phone, message, submitted_at
- Delete spam submissions if needed
```

### AdminWishes page should allow admin to

```text
- List wishes
- Approve wishes
- Hide wishes
- Filter by wedding and approval status
- Delete spam submissions if needed
```

---

## 11. Validation Rules

### 11.1 Wedding

```text
bride_name: required, max 255
groom_name: required, max 255
template_id: required, exists in wedding_templates,id
slug: nullable, unique
wedding_date: nullable, date
status: controlled by publish/unpublish endpoints
```

When creating a wedding, `template_id` must reference an active template.

When rendering an existing wedding, inactive templates are still allowed.

### 11.2 Images

```text
cover image:
- jpg, jpeg, png, webp
- max 5MB

gallery photos:
- jpg, jpeg, png, webp
- max 5MB each

QR image:
- jpg, jpeg, png, webp
- max 3MB

template thumbnail/preview/assets:
- jpg, jpeg, png, webp, svg
- max 5MB each
```

Cover/gallery rule:

```text
- Use weddings.cover_image_path for the main cover image.
- Use wedding_photos for gallery images.
- Do not use wedding_photos.is_cover in MVP v1.
```

### 11.3 RSVP

```text
guest_name: required, max 255
attendance_status: required, one of attending, not_attending, maybe
guest_count: integer, max 10

If attendance_status is attending or maybe:
- guest_count min 1

If attendance_status is not_attending:
- guest_count can be 0

message: nullable, max 2000
```

### 11.4 Wishes

```text
guest_name: required, max 255
message: required, max 2000
```

### 11.5 Template

```text
code: required, unique, max 100
name: required, max 255
category: nullable, max 100
component_name: required, max 255
default_config_json: nullable, valid JSON
supported_sections_json: nullable, valid JSON
status: required, one of active, inactive, archived
sort_order: integer
```

---

## 12. Laravel Backend Structure

Recommended files:

```text
app/
  Http/
    Controllers/
      Api/
        AuthController.php
        TemplateController.php
        MyWeddingController.php
        WeddingEventController.php
        WeddingPhotoController.php
        WeddingBankAccountController.php
        WeddingRsvpController.php
        WeddingWishController.php
        PublicWeddingController.php

      Api/Admin/
        AdminDashboardController.php
        AdminUserController.php
        AdminWeddingTemplateController.php
        AdminWeddingController.php
        AdminRsvpController.php
        AdminWishController.php

    Middleware/
      EnsureUserIsAdmin.php
      EnsureUserIsActive.php

    Requests/
      Auth/
      Wedding/
      WeddingEvent/
      WeddingPhoto/
      WeddingBankAccount/
      Rsvp/
      Wish/
      Admin/

    Resources/
      UserResource.php
      WeddingResource.php
      WeddingTemplateResource.php
      WeddingEventResource.php
      WeddingPhotoResource.php
      WeddingBankAccountResource.php
      WeddingRsvpResource.php
      WeddingWishResource.php

  Models/
    User.php
    WeddingTemplate.php
    WeddingTemplateAsset.php
    Wedding.php
    WeddingEvent.php
    WeddingPhoto.php
    WeddingBankAccount.php
    WeddingRsvp.php
    WeddingWish.php

  Policies/
    WeddingPolicy.php
    WeddingEventPolicy.php
    WeddingPhotoPolicy.php
    WeddingBankAccountPolicy.php

  Services/
    WeddingService.php
    FileUploadService.php
    SlugService.php
    TemplateService.php
```

Backend rules:

```text
1. Do not put too much business logic in controllers.
2. Use Service classes for publish, slug, template status, and upload logic.
3. Use FormRequest for validation.
4. Use API Resource for response formatting.
5. Use Policy for customer authorization.
6. Use admin middleware for /api/admin/*.
7. Public API must not return sensitive user data.
8. Public RSVP and wishes endpoints must be rate-limited.
9. Uploaded images must be validated.
10. Slug must always be unique.
11. Inactive templates must not be selectable for new weddings.
12. Existing weddings must still render even if their template becomes inactive.
13. Do not install or use Filament in MVP v1.
```

---

## 13. Laravel Migration Example — weddings

```php
Schema::create('weddings', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->foreignId('template_id')->constrained('wedding_templates')->restrictOnDelete();

    $table->string('slug')->nullable()->unique();
    $table->string('title')->nullable();

    $table->string('bride_name');
    $table->string('groom_name');

    $table->string('bride_full_name')->nullable();
    $table->string('groom_full_name')->nullable();

    $table->string('bride_phone', 30)->nullable();
    $table->string('groom_phone', 30)->nullable();

    $table->string('bride_father_name')->nullable();
    $table->string('bride_mother_name')->nullable();
    $table->string('groom_father_name')->nullable();
    $table->string('groom_mother_name')->nullable();

    $table->string('cover_image_path', 500)->nullable();
    $table->text('intro_text')->nullable();
    $table->text('love_story')->nullable();

    $table->date('wedding_date')->nullable();
    $table->string('lunar_date_text')->nullable();

    $table->string('music_url', 500)->nullable();
    $table->string('language', 20)->default('vi');

    $table->json('theme_config_json')->nullable();

    $table->string('status', 30)->default('draft')->index();
    $table->boolean('is_public')->default(false)->index();
    $table->boolean('hide_watermark')->default(false);

    $table->timestamp('published_at')->nullable();
    $table->timestamp('expires_at')->nullable();

    $table->timestamps();
    $table->softDeletes();
});
```

---

## 14. Seeder Data

Create:

```text
- one admin user
- one customer user
- five active wedding templates
- dummy weddings (draft and published) for the customer user
- dummy wedding events for published wedding
- dummy wedding photos for published wedding
- dummy bank accounts for published wedding
- dummy RSVPs for published wedding
- dummy Wishes for published wedding
```

Wedding templates:

```php
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
        'supported_sections_json' => [
            'sections' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
        ],
        'version' => '1.0.0',
        'is_featured' => true,
        'is_default' => true,
        'is_premium' => false,
        'price' => 0,
        'status' => 'active',
        'sort_order' => 1,
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
        'supported_sections_json' => [
            'sections' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
        ],
        'version' => '1.0.0',
        'is_featured' => true,
        'is_default' => false,
        'is_premium' => false,
        'price' => 0,
        'status' => 'active',
        'sort_order' => 2,
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
        'supported_sections_json' => [
            'sections' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
        ],
        'version' => '1.0.0',
        'is_featured' => true,
        'is_default' => false,
        'is_premium' => true,
        'price' => 199000,
        'status' => 'active',
        'sort_order' => 3,
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
        'supported_sections_json' => [
            'sections' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
        ],
        'version' => '1.0.0',
        'is_featured' => false,
        'is_default' => false,
        'is_premium' => false,
        'price' => 0,
        'status' => 'active',
        'sort_order' => 4,
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
        'supported_sections_json' => [
            'sections' => ['hero', 'countdown', 'couple', 'events', 'gallery', 'story', 'bank_qr', 'rsvp', 'wishes'],
        ],
        'version' => '1.0.0',
        'is_featured' => false,
        'is_default' => false,
        'is_premium' => true,
        'price' => 299000,
        'status' => 'active',
        'sort_order' => 5,
    ],
];
```

---

## 15. React Frontend Structure

Use a feature-based structure because the React app has three clear areas: public, customer, and admin.

```text
src/
  app/
    App.jsx
    router.jsx
    providers.jsx

  api/
    axiosClient.js

  features/
    auth/
      api/
        authApi.js
      pages/
        LoginPage.jsx
        RegisterPage.jsx
      store/
        authStore.js

    public/
      api/
        publicTemplateApi.js
        publicWeddingApi.js
      pages/
        HomePage.jsx
        TemplatesPage.jsx
        TemplatePreviewPage.jsx
        PublicWeddingPage.jsx
      components/
        PublicTemplateCard.jsx
        PublicHeroSection.jsx
        PublicCtaSection.jsx

    customer/
      api/
        customerWeddingApi.js
        customerEventApi.js
        customerPhotoApi.js
        customerBankAccountApi.js
        customerRsvpApi.js
        customerWishApi.js
      pages/
        CustomerDashboardPage.jsx
        WeddingListPage.jsx
        WeddingCreatePage.jsx
        WeddingEditPage.jsx
        WeddingPreviewPage.jsx
        WeddingRsvpPage.jsx
      components/
        WeddingBasicInfoForm.jsx
        WeddingEventForm.jsx
        WeddingPhotoUploader.jsx
        BankAccountForm.jsx
        WeddingPreview.jsx
        WeddingEventList.jsx
        WeddingGallery.jsx
        WeddingCountdown.jsx
        WeddingBankQr.jsx
        WeddingWishList.jsx

    admin/
      api/
        adminDashboardApi.js
        adminUserApi.js
        adminTemplateApi.js
        adminWeddingApi.js
        adminRsvpApi.js
        adminWishApi.js
      pages/
        AdminDashboardPage.jsx
        users/
          AdminUserListPage.jsx
          AdminUserCreatePage.jsx
          AdminUserEditPage.jsx
        templates/
          AdminTemplateListPage.jsx
          AdminTemplateCreatePage.jsx
          AdminTemplateEditPage.jsx
        weddings/
          AdminWeddingListPage.jsx
          AdminWeddingDetailPage.jsx
        AdminRsvpListPage.jsx
        AdminWishListPage.jsx
      components/
        AdminStatsCard.jsx
        UserForm.jsx
        TemplateForm.jsx
        TemplateAssetUploader.jsx

    weddingTemplates/
      components/
        MinimalWhiteTemplate.jsx
        FloralPastelTemplate.jsx
        LuxuryGoldTemplate.jsx
        TraditionalRedTemplate.jsx
        ModernPhotoStoryTemplate.jsx
      templateMap.js

  shared/
    components/
      Button.jsx
      Input.jsx
      Select.jsx
      Modal.jsx
      DataTable.jsx
      Pagination.jsx
      StatusBadge.jsx
      ConfirmDialog.jsx
      LoadingSpinner.jsx
      EmptyState.jsx

    layouts/
      PublicLayout.jsx
      AuthLayout.jsx
      CustomerLayout.jsx
      AdminLayout.jsx

    routes/
      PrivateRoute.jsx
      AdminRoute.jsx
      CustomerRoute.jsx

    utils/
      date.js
      slug.js
      permissions.js
      file.js
```

Frontend structure rules:

```text
1. Do not put all pages directly under one large pages folder.
2. Put domain-specific pages, APIs, and components inside features/*.
3. Put reusable UI components, layouts, route guards, and utilities inside shared/*.
4. Use CustomerLayout for customer/client dashboard routes.
5. Use AdminLayout for admin dashboard routes.
6. Use PublicLayout for marketing/public wedding pages.
7. Keep wedding invitation template components inside features/weddingTemplates only.
```

---

## 16. React Routing Structure

```text
Public routes:
GET    /                         -> HomePage
GET    /templates                -> TemplatesPage
GET    /templates/:code          -> TemplatePreviewPage
GET    /w/:slug                  -> PublicWeddingPage

Auth routes:
GET    /login                    -> LoginPage
GET    /register                 -> RegisterPage

Customer routes:
GET    /customer/dashboard       -> CustomerDashboardPage
GET    /customer/weddings        -> WeddingListPage
GET    /customer/weddings/create -> WeddingCreatePage
GET    /customer/weddings/:id/edit -> WeddingEditPage
GET    /customer/weddings/:id/preview -> WeddingPreviewPage
GET    /customer/weddings/:id/rsvps -> WeddingRsvpPage

Admin routes:
GET    /admin/dashboard          -> AdminDashboardPage
GET    /admin/users              -> AdminUserListPage
GET    /admin/users/create       -> AdminUserCreatePage
GET    /admin/users/:id/edit     -> AdminUserEditPage
GET    /admin/templates          -> AdminTemplateListPage
GET    /admin/templates/create   -> AdminTemplateCreatePage
GET    /admin/templates/:id/edit -> AdminTemplateEditPage
GET    /admin/weddings           -> AdminWeddingListPage
GET    /admin/weddings/:id       -> AdminWeddingDetailPage
GET    /admin/rsvps              -> AdminRsvpListPage
GET    /admin/wishes             -> AdminWishListPage
```

Route naming rule:

```text
Use /customer/* instead of /app/* so it is clear that these routes belong to the customer/client dashboard.
Use /admin/* for admin dashboard routes.
Use /w/:slug for public wedding invitation links.
```

---

## 17. Template System Design

The platform should support many wedding invitation templates.

Use this approach:

```text
React component template + database configuration + template assets
```

### Template Levels

```text
Level 1: React component
- Example: FloralPastelTemplate.jsx, LuxuryGoldTemplate.jsx
- Controls main layout and responsive design

Level 2: Template default configuration from database
- Stored in wedding_templates.default_config_json
- Controls colors, fonts, section order, background and visual settings

Level 3: User wedding data
- Stored in weddings, wedding_events, wedding_photos, wedding_bank_accounts, wedding_rsvps, wedding_wishes
```

This allows one React component to have multiple visual variants.

Example:

```text
FloralPastelTemplate - Pink
FloralPastelTemplate - Blue
FloralPastelTemplate - Green
```

All variants can use the same React component but different `default_config_json`.

### Template Map

```jsx
import MinimalWhiteTemplate from './MinimalWhiteTemplate';
import FloralPastelTemplate from './FloralPastelTemplate';
import LuxuryGoldTemplate from './LuxuryGoldTemplate';
import TraditionalRedTemplate from './TraditionalRedTemplate';
import ModernPhotoStoryTemplate from './ModernPhotoStoryTemplate';

export const templateMap = {
  MinimalWhiteTemplate,
  FloralPastelTemplate,
  LuxuryGoldTemplate,
  TraditionalRedTemplate,
  ModernPhotoStoryTemplate,
};
```

Usage:

```jsx
const TemplateComponent = templateMap[wedding.template.component_name];

if (!TemplateComponent) {
  return <div>Template not found</div>;
}

return (
  <TemplateComponent
    wedding={wedding}
    config={wedding.template.default_config_json}
    assets={wedding.template.assets}
  />
);
```

---

## 18. Public Wedding API Response Example

```json
{
  "data": {
    "id": 1,
    "slug": "minh-anh-hoang-nam",
    "title": "Minh Anh & Hoang Nam",
    "bride_name": "Minh Anh",
    "groom_name": "Hoang Nam",
    "intro_text": "Tran trong kinh moi ban den du le cuoi cua chung toi",
    "love_story": "Chung toi gap nhau vao mot ngay mua thu...",
    "cover_image_url": "http://localhost:8000/storage/cover.jpg",
    "wedding_date": "2026-12-20",
    "template": {
      "id": 1,
      "code": "floral_pastel",
      "name": "Floral Pastel",
      "component_name": "FloralPastelTemplate",
      "default_config_json": {
        "primary_color": "#D98BA5",
        "font_heading": "Playfair Display",
        "font_body": "Inter"
      },
      "assets": []
    },
    "events": [],
    "photos": [],
    "bank_accounts": [],
    "wishes": []
  }
}
```

---

## 19. Wedding Creation Flow

Use a simple tab-based flow or separate pages.

```text
Step 1: Select template
Step 2: Enter basic couple information
Step 3: Add wedding events
Step 4: Upload cover image and gallery photos
Step 5: Add bank QR/account information
Step 6: Preview and publish
```

Do not build a drag-and-drop editor in MVP v1.

---

## 20. Full Development Order

Build in this order:

```text
Step 1:
Laravel migrations + models + relationships + seeders

Step 2:
Sanctum token-based Auth API

Step 3:
Role middleware + active user middleware

Step 4:
Customer Template API + Wedding CRUD API

Step 5:
Events / Photos / Bank Accounts API

Step 6:
Public wedding API + RSVP + Wishes

Step 7:
Admin API: dashboard, users, templates, weddings, RSVP, wishes

Step 8:
React auth + layouts + API client + route guards

Step 9:
React customer dashboard create/edit wedding

Step 10:
React admin dashboard for users/templates/weddings/RSVP/wishes

Step 11:
React public wedding page + 5 templates

Step 12:
Test full flow:
register -> create wedding -> add event -> upload image -> publish -> public view -> RSVP -> admin review
```

---

## 21. Final Prompt for AI/Dev Agent

Copy this prompt to Cursor, Codex, Claude, GPT, or another dev agent.

```text
You are a senior full-stack engineer. Build the MVP v1 base project for an online wedding invitation platform.

Tech stack:
- Backend: Laravel REST API
- Authentication: Laravel Sanctum token-based API auth
- Database: MySQL
- Frontend: ReactJS with Vite
- Admin: React admin dashboard
- Styling: TailwindCSS
- Routing: React Router
- Forms: React Hook Form
- HTTP client: Axios
- File upload: Laravel public storage disk

Product goal:
Build a web platform where customers can create online wedding invitations from prebuilt templates. Customers can input wedding information, add events, upload photos, add bank QR/account information, preview the invitation, publish it as a public link, and collect RSVP/wishes from guests.

Admin goal:
Build a React admin dashboard to manage users, templates, weddings, RSVP, and wishes. Admin must be able to enable/disable templates and activate/deactivate/ban users.

Important MVP rules:
- Do NOT build a drag-and-drop editor.
- Do NOT build online payment.
- Do NOT build plans/orders/payments.
- Do NOT build studio/agency accounts.
- Do NOT build invite-code guest system.
- Do NOT build personalized guest invitation links.
- Do NOT build Filament admin panel.
- Admin and customer/client both use React.

User roles:
1. admin
2. customer

User status:
- active: can log in
- inactive: cannot log in
- banned: cannot log in, tokens should be revoked

Template status:
- active: visible and selectable by customers
- inactive: hidden from customer template list and cannot be selected for new weddings
- archived: hidden by default

Existing weddings must still render even if their template becomes inactive.

Backend requirements:

Create Laravel models, migrations, factories, seeders, controllers, requests, resources, policies, services, routes, and admin API controllers for:

- User
- WeddingTemplate
- WeddingTemplateAsset
- Wedding
- WeddingEvent
- WeddingPhoto
- WeddingBankAccount
- WeddingRsvp
- WeddingWish

Implement relationships:
- User has many Weddings
- Wedding belongs to User
- Wedding belongs to WeddingTemplate
- WeddingTemplate has many WeddingTemplateAssets
- WeddingTemplate has many Weddings
- Wedding has many WeddingEvents
- Wedding has many WeddingPhotos
- Wedding has many WeddingBankAccounts
- Wedding has many WeddingRsvps
- Wedding has many WeddingWishes

API routes:

Auth:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me

Templates:
GET /api/templates
GET /api/templates/{id}
GET /api/templates/by-code/{code}

Customer wedding routes:
GET /api/my/weddings
POST /api/my/weddings
GET /api/my/weddings/{id}
PUT /api/my/weddings/{id}
DELETE /api/my/weddings/{id}
POST /api/my/weddings/{id}/publish
POST /api/my/weddings/{id}/unpublish

Wedding events:
GET /api/my/weddings/{weddingId}/events
POST /api/my/weddings/{weddingId}/events
PUT /api/my/weddings/{weddingId}/events/{eventId}
DELETE /api/my/weddings/{weddingId}/events/{eventId}

Wedding photos:
GET /api/my/weddings/{weddingId}/photos
POST /api/my/weddings/{weddingId}/photos
PUT /api/my/weddings/{weddingId}/photos/{photoId}
DELETE /api/my/weddings/{weddingId}/photos/{photoId}

Bank accounts:
GET /api/my/weddings/{weddingId}/bank-accounts
POST /api/my/weddings/{weddingId}/bank-accounts
PUT /api/my/weddings/{weddingId}/bank-accounts/{bankAccountId}
DELETE /api/my/weddings/{weddingId}/bank-accounts/{bankAccountId}

RSVP dashboard:
GET /api/my/weddings/{weddingId}/rsvps
GET /api/my/weddings/{weddingId}/wishes

Public routes:
GET /api/public/weddings/{slug}
POST /api/public/weddings/{slug}/rsvp
POST /api/public/weddings/{slug}/wishes

Admin routes:
GET /api/admin/dashboard
GET /api/admin/users
POST /api/admin/users
GET /api/admin/users/{id}
PUT /api/admin/users/{id}
DELETE /api/admin/users/{id}
PATCH /api/admin/users/{id}/status
PATCH /api/admin/users/{id}/role
GET /api/admin/templates
POST /api/admin/templates
GET /api/admin/templates/{id}
PUT /api/admin/templates/{id}
DELETE /api/admin/templates/{id}
PATCH /api/admin/templates/{id}/status
POST /api/admin/templates/{id}/assets
DELETE /api/admin/templates/{id}/assets/{assetId}
GET /api/admin/weddings
GET /api/admin/weddings/{id}
PUT /api/admin/weddings/{id}
DELETE /api/admin/weddings/{id}
POST /api/admin/weddings/{id}/publish
POST /api/admin/weddings/{id}/unpublish
GET /api/admin/rsvps
GET /api/admin/weddings/{id}/rsvps
DELETE /api/admin/rsvps/{id}
GET /api/admin/wishes
GET /api/admin/weddings/{id}/wishes
PATCH /api/admin/wishes/{id}/approve
PATCH /api/admin/wishes/{id}/hide
DELETE /api/admin/wishes/{id}

Validation:
Use FormRequest classes.

Validate images:
- cover image max 5MB
- gallery photos max 5MB each
- QR image max 3MB
- template assets max 5MB each
- allowed image types: jpg, jpeg, png, webp, svg for template assets only

Validate RSVP:
- guest_name required
- attendance_status required and must be attending, not_attending, maybe
- guest_count max 10
- if attendance_status is attending or maybe, guest_count must be at least 1
- if attendance_status is not_attending, guest_count can be 0
- message max 2000 chars

Validate wedding:
- bride_name required
- groom_name required
- template_id required and exists
- template_id must be active when creating a new wedding
- slug unique and nullable
- status controlled by publish/unpublish endpoints

Authorization:
- Customers can only manage their own weddings and related records.
- Admin can manage all data through /api/admin/*.
- Only users with role = admin and status = active can access admin API endpoints.

Public wedding logic:
GET /api/public/weddings/{slug} should only return weddings where:
- status = published
- is_public = true
- deleted_at is null

If not found, return 404.

Publish logic:
When user publishes a wedding:
- validate required data
- generate unique slug if missing
- set status = published
- set is_public = true
- set published_at = now() if empty

When user unpublishes:
- set status = draft
- set is_public = false

Template system:
- Do not store full HTML/CSS/JS in database.
- Store only metadata, config, and assets in database.
- Keep layout code inside React components.
- Render templates based on wedding.template.component_name.

Create seed data:
- Admin user
- Customer user
- Five templates:
  1. minimal_white - Minimal White
  2. floral_pastel - Floral Pastel
  3. luxury_gold - Luxury Gold
  4. traditional_red - Traditional Red
  5. modern_photo_story - Modern Photo Story

Frontend requirements:

Build ReactJS frontend with:
- Vite
- TailwindCSS
- React Router
- Axios
- React Hook Form
- Token-based authentication
- Role-based route guards

Use this frontend structure:

src/
  app/
    App.jsx
    router.jsx
    providers.jsx

  api/
    axiosClient.js

  features/
    auth/
      api/authApi.js
      pages/LoginPage.jsx
      pages/RegisterPage.jsx
      store/authStore.js

    public/
      api/publicTemplateApi.js
      api/publicWeddingApi.js
      pages/HomePage.jsx
      pages/TemplatesPage.jsx
      pages/TemplatePreviewPage.jsx
      pages/PublicWeddingPage.jsx

    customer/
      api/customerWeddingApi.js
      api/customerEventApi.js
      api/customerPhotoApi.js
      api/customerBankAccountApi.js
      api/customerRsvpApi.js
      api/customerWishApi.js
      pages/CustomerDashboardPage.jsx
      pages/WeddingListPage.jsx
      pages/WeddingCreatePage.jsx
      pages/WeddingEditPage.jsx
      pages/WeddingPreviewPage.jsx
      pages/WeddingRsvpPage.jsx
      components/WeddingBasicInfoForm.jsx
      components/WeddingEventForm.jsx
      components/WeddingPhotoUploader.jsx
      components/BankAccountForm.jsx

    admin/
      api/adminDashboardApi.js
      api/adminUserApi.js
      api/adminTemplateApi.js
      api/adminWeddingApi.js
      api/adminRsvpApi.js
      api/adminWishApi.js
      pages/AdminDashboardPage.jsx
      pages/users/AdminUserListPage.jsx
      pages/users/AdminUserCreatePage.jsx
      pages/users/AdminUserEditPage.jsx
      pages/templates/AdminTemplateListPage.jsx
      pages/templates/AdminTemplateCreatePage.jsx
      pages/templates/AdminTemplateEditPage.jsx
      pages/weddings/AdminWeddingListPage.jsx
      pages/weddings/AdminWeddingDetailPage.jsx
      pages/AdminRsvpListPage.jsx
      pages/AdminWishListPage.jsx

    weddingTemplates/
      components/MinimalWhiteTemplate.jsx
      components/FloralPastelTemplate.jsx
      components/LuxuryGoldTemplate.jsx
      components/TraditionalRedTemplate.jsx
      components/ModernPhotoStoryTemplate.jsx
      templateMap.js

  shared/
    components/Button.jsx
    components/Input.jsx
    components/Select.jsx
    components/Modal.jsx
    components/DataTable.jsx
    components/Pagination.jsx
    components/StatusBadge.jsx
    components/ConfirmDialog.jsx
    layouts/PublicLayout.jsx
    layouts/AuthLayout.jsx
    layouts/CustomerLayout.jsx
    layouts/AdminLayout.jsx
    routes/PrivateRoute.jsx
    routes/AdminRoute.jsx
    routes/CustomerRoute.jsx
    utils/date.js
    utils/slug.js
    utils/permissions.js

Frontend route requirements:
- Public routes use / and /templates and /w/:slug.
- Customer/client dashboard routes use /customer/*.
- Admin dashboard routes use /admin/*.
- Do not use /app/* for customer pages because it is ambiguous.

Wedding template components:
- MinimalWhiteTemplate
- FloralPastelTemplate
- LuxuryGoldTemplate
- TraditionalRedTemplate
- ModernPhotoStoryTemplate

Each template receives:
<TemplateComponent
  wedding={wedding}
  config={wedding.template.default_config_json}
  assets={wedding.template.assets}
/>

Make the design mobile-first, clean, elegant, and suitable for wedding invitations.

Expected output:
- Laravel backend project with migrations, models, controllers, routes, requests, resources, policies, services, seeders, and admin API controllers.
- React frontend project with routing, API client, auth pages, customer dashboard pages, admin dashboard pages, public wedding page, and five basic templates.
- README with installation steps.
```

---

## 22. Final Pre-Build Checklist

Before generating code, make sure these rules are applied:

```text
1. Admin uses React, not Filament, in MVP v1.
2. Customer/client uses React.
3. Public pages use React.
4. Laravel only provides REST API and upload/business logic.
5. users.status controls login access.
6. wedding_templates.status controls template visibility.
7. Only active templates are selectable for new weddings.
8. Existing weddings still render if their template becomes inactive.
9. weddings.slug is nullable and generated on publish.
10. weddings.cover_image_path is the main cover image.
11. wedding_photos is used only for gallery images.
12. RSVP guest_count depends on attendance_status.
13. Public RSVP and wishes endpoints are rate-limited.
14. Customers can only manage their own weddings.
15. Admin can manage all records through /api/admin/*.
16. Public API does not return sensitive user data.
17. Do not create studio_profiles, wedding_guests, plans, orders, or payments in MVP v1.
18. Do not build drag-and-drop editor.
19. Build backend API first, then frontend.
20. Use feature-based React folders: features/public, features/customer, features/admin, features/auth, features/weddingTemplates.
21. Use /customer/* for customer routes, not /app/*.
22. Use CustomerLayout for customer dashboard, not AppLayout.
```

---

## 23. Final Recommendation

The most practical MVP v1 is:

```text
Laravel REST API + React Public Pages + React Customer Dashboard + React Admin Dashboard
```

Focus on:

```text
Prebuilt templates + form input + preview + publish + RSVP + admin template/user management
```

Do not build complex editor, payment, studio accounts, invite-code system, or Filament admin panel in the first version.
