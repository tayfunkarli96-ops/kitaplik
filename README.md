# COrnFliX
**Proje Tanımı:** 
COrnFliX isimli film yorumlama sitemiz kullanıcılarının eski ve yeni çıkmış filmlerden haberdar olabileceği, filmleri puanlayabileceği, yorum yapabileceği ve kullanıcıların birbirleri ile etkileşime girebileceği kullanıcı dostu bir site olarak tasarlandı. Kullanıcıların puanlamasına göre filmi daha sonra izlemek için izleme listesine ekleyebilir, izlediğiniz filmleri işaretleyebilir ve en sevdiğiniz filmleri favorilerinize ekleyebilirsiniz. Ayrıca filmler hakkındaki gelişmeleri takip edebilir, aradığınız filmi filtreleme sistemi ile rahatça bulabilirsiniz. Kısacası bir film severseniz sitemizi kullanmaktan zevk alacağınızı düşünüyoruz. 

**Proje Kategorisi:** Film

**Referans Uygulama:** [imdb.com](https://www.imdb.com/), [rottentomatoes.com](https://www.rottentomatoes.com/)



**Grup Adı:** TAyKaR

**Proje Ekibi:** Tayfun KARLI


<img width="2816" height="1536" alt="Gemini_Generated_Image_tkdvtjtkdvtjtkdv (1)" src="https://github.com/user-attachments/assets/c961acbb-677f-4236-8fbf-5b660c5c7a38" />
## 2. Rest API Tasarımı

Cornflix platformu için hazırlanan API tasarımı, belirlenen 10 temel gereksinimi (Admin, Kayıtlı Kullanıcı ve Misafir rolleri) kapsayacak şekilde OpenAPI 3.0 standardında ayrı bir dosyada yapılandırılmıştır. 

### 🎬 API İşlem Özeti

| No | Fonksiyon | Endpoint (Uç Nokta) | Metot | Erişim Rolü |
|:---|:---|:---|:---|:---|
| 1 | Profil Güncelleme | `/api/users/{userid}` | `PUT` | Kayıtlı Kullanıcı |
| 2 | Film Güncelleme | `/api/movies/{movieid}` | `PUT` | Admin |
| 3 | Oyuncu/Yönetmen Bilgi | `/api/people/{personid}` | `GET` | Tümü |
| 4 | Gelişmiş Filtreleme | `/api/movies` | `GET` | Tümü |
| 5 | Yorum Düzenleme | `/api/comments/{commentid}` | `PUT` | Kayıtlı Kullanıcı |
| 6 | İzleme Listesi Yönetimi | `/api/users/{userid}/watchlist` | `POST` | Kayıtlı Kullanıcı |
| 7 | Yorum Onaylama | `/api/comments/{commentid}/approve` | `PATCH` | Admin |
| 8 | Film Öneri Testi (Quiz) | `/api/quiz/recommend` | `POST` | Tümü |
| 9 | Haber Güncelleme | `/api/news/{newsid}` | `PUT` | Admin |
| 10| Çoklu Dil Desteği | `/api/movies` (Header) | `GET` | Tümü |

---

### 🛠️ Teknik Dokümantasyon
API'nin tüm şemalarını ve teknik tanımlamalarını içeren ana dosyaya aşağıdan ulaşabilirsiniz:

👉 **[Cornflix API Teknik Detay Dosyası (YAML) İçin Tıklayınız](./lamine.yml)**

```yaml
# OpenAPI 3.0.3 Standart Tasarımı
openapi: 3.0.3
info:
  title: Cornflix API
  version: 1.0.0
# Tüm detaylar yukarıdaki lamine.yml dosyasındadır.
