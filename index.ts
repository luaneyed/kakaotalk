const REST_API_KEY = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = 'http://localhost:3000';
const ACCESS_TOKEN = '';

console.log('Get code here!', `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${['talk_message'].join(',')}`);

const getKakaoAccessToken = async (code: string) => {
  const { data: { access_token } } = await axios.post(
    `https://kauth.kakao.com/oauth/token`,
    qs.stringify({
      grant_type : 'authorization_code',
      client_id : REST_API_KEY,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  );
  
  return access_token
};

const sendMe = (text: string) => axios.post(
  `https://kapi.kakao.com/v2/api/talk/memo/default/send`,
  qs.stringify({
    template_object: JSON.stringify({
      object_type: 'text',
      text,
      link: {
        web_url: 'z',
        mobile_url: 'z',
      }
    }),
  }),
  {
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
);
