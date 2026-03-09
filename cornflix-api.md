API Tasarımı - OpenAPI Specification Örneği
OpenAPI Spesifikasyon Dosyası: lamine.yaml

Bu doküman, OpenAPI Specification (OAS) 3.0 standardına göre hazırlanmış örnek bir API tasarımını içermektedir.

openapi: 3.0.3
info:
  title: Cornflix Film ve İçerik Yönetim API
  description: |
    Cornflix platformu için RESTful API tasarımı.
    ## Özellikler
    - Kullanıcı ve Profil Yönetimi
    - Film Kataloğu ve Oyuncu Veritabanı
    - JWT Tabanlı Kimlik Doğrulama
    - Admin Onay Sistemi ve Haber Yönetimi
  version: 1.0.0
  contact:
    name: Cornflix API Destek Ekibi
    email: api-support@cornflix.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.cornflix.com/v1
    description: Production server
  - url: http://localhost:3000/v1
    description: Development server

tags:
  - name: auth
    description: Kimlik doğrulama işlemleri
  - name: users
    description: Kullanıcı yönetimi ve profil işlemleri
  - name: movies
    description: Film kataloğu ve içerik işlemleri
  - name: community
    description: Yorum ve değerlendirme işlemleri

paths:
  /auth/login:
    post:
      tags: [auth]
      summary: Kullanıcı girişi
      operationId: loginUser
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginCredentials'
      responses:
        '200':
          description: Giriş başarılı
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthToken'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /users/{userId}:
    put:
      tags: [users]
      summary: 1. Kullanıcı profilini güncelleme
      operationId: updateUser
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/UserIdParam'
      requestBody:
        required: true
        content:
          application/json
