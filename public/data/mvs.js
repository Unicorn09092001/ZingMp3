var listMV = [
  {
    title: "Một Bước Yêu Vạn Dặm Đau",
    artists: [{ name: "Mr. Siro" }],
    time: "11:54",
    artist: { thumbnail: "assets/img/mvArtists/artist1.jpg" },
    thumbnailM: "assets/img/MVs/mv1.jpg",
  },
  {
    title: "Simple Love",
    artists: [{ name: "Obito" }, { name: "Seachains" }, { name: "Davis" }],
    time: "03:54",
    artist: { thumbnail: "assets/img/mvArtists/artist2.jpg" },
    thumbnailM: "assets/img/MVs/mv2.jpg",
  },
  {
    title: "Lời Yêu Ngây Dại",
    artists: [{ name: "Kha" }],
    time: "04:33",
    artist: { thumbnail: "assets/img/mvArtists/artist3.jpg" },
    thumbnailM: "assets/img/MVs/mv3.jpg",
  },
  {
    title: "24H",
    artists: [{ name: "LyLy" }, { name: "Magazine" }],
    time: "04:18",
    artist: { thumbnail: "assets/img/mvArtists/artist4.jpg" },
    thumbnailM: "assets/img/MVs/mv4.jpg",
  },
  {
    title: "Nước Mắt Em Lau Bằng Tình Yêu Mới",
    artists: [{ name: "Da LAB" }, { name: "Tóc Tiên" }],
    time: "05:45",
    artist: { thumbnail: "assets/img/mvArtists/artist5.jpg" },
    thumbnailM: "assets/img/MVs/mv5.jpg",
  },

  {
    title: "Yêu Đơn Phương",
    artists: [{ name: "OnlyC" }, { name: "Karik" }],
    time: "05:02",
    artist: { thumbnail: "assets/img/mvArtists/artist6.jpg" },
    thumbnailM: "assets/img/MVs/mv6.jpg",
  },
  {
    title: "Phía Sau Em",
    artists: [{ name: "Kay Trần" }, { name: "Binz" }],
    time: "04:06",
    artist: { thumbnail: "assets/img/mvArtists/artist7.jpg" },
    thumbnailM: "assets/img/MVs/mv7.jpg",
  },
  {
    title: "Mình Yêu nhau đi",
    artists: [{ name: "Bích Phương" }],
    time: "03:52",
    artist: { thumbnail: "assets/img/mvArtists/artist8.jpg" },
    thumbnailM: "assets/img/MVs/mv8.jpg",
  },
  {
    title: "Đừng Về Trễ (Acoustic Version)",
    artists: [{ name: "Sơn Tùng MTP" }],
    time: "04:41",
    artist: { thumbnail: "assets/img/mvArtists/artist9.jpg" },
    thumbnailM: "assets/img/MVs/mv9.jpg",
  },
  {
    title: "Hơn Cả Yêu",
    artists: [{ name: "Đức Phúc" }],
    time: "05:43",
    artist: { thumbnail: "assets/img/mvArtists/artist10.jpg" },
    thumbnailM: "assets/img/MVs/mv10.jpg",
  },
  {
    title: "Vì Yêu Cứ Đâm Đầu",
    artists: [{ name: "MIN" }, { name: "Đen" }, { name: "JustaTee" }],
    time: "04:01",
    artist: { thumbnail: "assets/img/mvArtists/artist11.jpg" },
    thumbnailM: "assets/img/MVs/mv11.jpg",
  },
  {
    title: "Sao Anh Chưa Về Nhà",
    artists: [{ name: "AMEE" }, { name: "Ricky Star" }],
    time: "04:36",
    artist: { thumbnail: "assets/img/mvArtists/artist12.jpg" },
    thumbnailM: "assets/img/MVs/mv12.jpg",
  },
  {
    title: "Bigcityboi",
    artists: [{ name: "Binz" }, { name: "Touliver" }],
    time: "03:43",
    artist: { thumbnail: "assets/img/mvArtists/artist13.jpg" },
    thumbnailM: "assets/img/MVs/mv13.jpg",
  },
  {
    title: "Em Không Sai Chúng Ta Sai",
    artists: [{ name: "ERIK" }],
    time: "06:28",
    artist: { thumbnail: "assets/img/mvArtists/artist14.jpg" },
    thumbnailM: "assets/img/MVs/mv14.jpg",
  },
];

const MV_STORAGE_KEY = "VIK_MV";

localStorage.setItem(MV_STORAGE_KEY, JSON.stringify(listMV));
