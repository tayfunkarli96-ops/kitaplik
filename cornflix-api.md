# 🚀 COrnFliX API Tasarım Dokümantasyonu

**Ana Teknik Dosya:** [lamine.yml](./lamine.yml)

Bu doküman, COrnFliX film platformunun 10 temel fonksiyonel gereksinimini kapsayan, **OpenAPI 3.0.3** standartlarında hazırlanmış profesyonel API tasarımıdır.

## 🎬 API İşlem Özeti (10 Gereksinim Matrisi)

| No | Fonksiyon | Endpoint (Uç Nokta) | Metot | Erişim Rolü |
|:---:|:---|:---|:---:|:---|
| 1 | Profil Güncelleme | `/users/{id}` | PUT | Kayıtlı Kullanıcı |
| 2 | Film Güncelleme | `/movies/{id}` | PUT | Admin |
| 3 | Oyuncu/Yönetmen Bilgi | `/people/{id}` | GET | Tümü |
| 4 | Gelişmiş Filtreleme | `/movies` | GET | Tümü |
| 5 | Yorum Düzenleme | `/comments/{id}` | PUT | Kayıtlı Kullanıcı |
| 6 | İzleme Listesi Yönetimi| `/users/{id}/watchlist`| POST | Kayıtlı Kullanıcı |
| 7 | Yorum Onaylama | `/comments/{id}/approve`| PATCH | Admin |
| 8 | Film Öneri (Quiz) | `/quiz/recommend` | POST | Tümü |
| 9 | Haber Güncelleme | `/news/{id}` | PUT | Admin |
| 10| Çoklu Dil Desteği | `/movies` (Header) | GET | Tümü |

## 🛠️ Teknik Önizleme (Formatlı Görünüm)

```yaml
# lamine.yml içeriğinin bir kopyası aşağıdadır:
(Buraya yukarıdaki lamine.yml kodlarının tamamını yapıştır)
