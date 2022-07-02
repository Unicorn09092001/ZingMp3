var listAlbum = [
  {
    title: "Golden Hour",
    thumbnail: "assets/img/albums/album1.jpg",
  },
  {
    title: "Boycold (Mini Album)",
    thumbnail: "assets/img/albums/album2.jpg",
  },
  {
    title: "Red",
    thumbnail: "assets/img/albums/album3.jpg",
  },
  {
    title: "Người Yêu Cũ (Gửi Cho Anh 2) (Mini Album)",
    thumbnail: "assets/img/albums/album4.jpg",
  },
  {
    title: "Querencia (Mini Album)",
    thumbnail: "assets/img/albums/album5.jpg",
  },
  {
    title: "Justice (Mini Album)",
    thumbnail: "assets/img/albums/album6.jpg",
  },
  {
    title: "Teenage Dream",
    thumbnail: "assets/img/albums/album7.jpg",
  },
  {
    title: "The Off Season",
    thumbnail: "assets/img/albums/album8.jpg",
  },
  {
    title: "The Album",
    thumbnail: "assets/img/albums/album9.jpg",
  },
  {
    title: "Random Access Memories",
    thumbnail: "assets/img/albums/album10.jpg",
  },
  {
    title: "Map of the Soul: 7",
    thumbnail: "assets/img/albums/album11.jpg",
  },
  {
    title: "Chromatica",
    thumbnail: "assets/img/albums/album12.jpg",
  },
  {
    title: "My Turn",
    thumbnail: "assets/img/albums/album13.jpg",
  },
  {
    title: "Meet the Woo 2",
    thumbnail: "assets/img/albums/album14.jpg",
  },
  {
    title: "Lemonade",
    thumbnail: "assets/img/albums/album15.jpg",
  },
];

const ALBUM_STORAGE_KEY = "VIK_ALBUM";

localStorage.setItem(ALBUM_STORAGE_KEY, JSON.stringify(listAlbum));
