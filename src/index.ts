import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

type RecommendationMap = {
  [type: string]: {
    [nation: string]: {
      [state: string]: string;
    };
  };
};


const recommendations: RecommendationMap = {
  all: {
    allNation: {
      allState: '떡국',
      solo: '뚝배기불고기',
      friend: '비빔막국수',
      couple: '마르게리따피자',
      family: '굴구이',
      gather: '소불고기',
    },
    kr: {
      allState: '산낙지',
      solo: '물냉면',
      friend: '알탕',
      couple: '떡볶이',
      family: '꼬리곰탕',
      gather: '조개구이',
    },
    cn: {
      allState: '난자완스',
      solo: '울면',
      friend: '마라롱샤',
      couple: '버섯탕수',
      family: '어향동고',
      gather: '팔보채',
    },
    jp: {
      allState: '규동',
      solo: '치킨까스',
      friend: '소유라멘',
      couple: '야끼소바',
      family: '메밀소바',
      gather: '사시미모리아와세',
    },
    us: {
      allState: '등심스테이크',
      solo: '토스트',
      friend: '햄버거',
      couple: '맥앤치즈',
      family: '빵',
      gather: '바베큐 플래터',
    },
    asia: {
      allState: '쌀국수',
      solo: '쌀국수',
      friend: '탄두리치킨',
      couple: '탄두리치킨',
      family: '월남쌈',
      gather: '월남쌈',
    },

  },
  meal: {
    allNation: {
      allState: '동태탕',
      solo: '라멘',
      friend: '삼게탕',
      couple: '함박스테이크',
      family: '생태탕',
      gather: '울면',
    },
    kr: {
      allState: '대구탕',
      solo: '순두부찌개',
      friend: '된장찌개',
      couple: '닭갈비',
      family: '순대',
      gather: '떡갈비',
    },
    cn: {
      allState: '짬뽕',
      solo: '마파두부덮밥',
      friend: '기스면',
      couple: '훠궈',
      family: '훠궈',
      gather: '중화냉면',
    },
    jp: {
      allState: '가라아게동',
      solo: '시오라멘',
      friend: '생선까스',
      couple: '야끼소바',
      family: '나베',
      gather: '스키야키',
    },
    us: {
      allState: '핫도그',
      solo: '햄버거',
      friend: '핫도그',
      couple: '브리또',
      family: '스테이크',
      gather: '바베큐 플래터',
    },
    asia: {
      allState: '탄두리치킨',
      solo: '쌀국수',
      friend: '월남쌈',
      couple: '나시고랭',
      family: '탄두리치킨',
      gather: '월남쌈',
    },

  },
  dish: {
    allNation: {
      allState: '마라탕',
      solo: '닭강정',
      friend: '일식튀김',
      couple: '사시미모리아와세',
      family: '메밀묵',
      gather: '동태전',
    },
    kr: {
      allState: '감자전',
      solo: '계란말이',
      friend: '삼겹살',
      couple: '대게',
      family: '아귀찜',
      gather: '두루치기',
    },
    cn: {
      allState: '마라롱샤',
      solo: '짜장면',
      friend: '라조기',
      couple: '깐쇼새우',
      family: '버섯탕수',
      gather: '멘보샤',
    },
    jp: {
      allState: '가라아게',
      solo: '타코야키',
      friend: '야키토리',
      couple: '나베',
      family: '나베',
      gather: '나베',
    },
    us: {
      allState: '찹스테이크',
      solo: '햄버거',
      friend: '소세지',
      couple: '하몽과 멜론',
      family: '소세지',
      gather: '바베큐 플래터',
    },
    asia: {
      allState: '월남쌈',
      solo: '쌀국수',
      friend: '탄두리치킨',
      couple: '탄두리치킨',
      family: '월남쌈',
      gather: '월남쌈',
    },

  },
  snack: {
    allNation: {
      allState: '팬케이크',
      solo: '베이글샌드위치',
      friend: '타코야키',
      couple: '쿠반샌드위치',
      family: '즉석떡볶이',
      gather: '도토리묵',
    },
    kr: {
      allState: '분식튀김',
      solo: '짜장면',
      friend: '메밀묵',
      couple: '떡볶이',
      family: '분식튀김',
      gather: '메밀묵',
    },
    cn: {
      allState: '군만두',
      solo: '군만두',
      friend: '군만두',
      couple: '딤섬',
      family: '딤섬',
      gather: '물만두',
    },
    jp: {
      allState: '일식튀김',
      solo: '타코야키',
      friend: '일식튀김',
      couple: '야키토리',
      family: '교자',
      gather: '야키토리',
    },
    us: {
      allState: '쿠반샌드위치',
      solo: '토스트',
      friend: '소세지',
      couple: '토스트',
      family: '핫도그',
      gather: '햄버거',
    },
    asia: {
      allState: '쏨땀',
      solo: '반미',
      friend: '반미',
      couple: '솜땀',
      family: '솜땀',
      gather: '반미',
    },

  },
};

app.post('/recommendation', (req, res) => {
  const { type, nation, state } = req.body;

  if (type && nation && state) {
    const recommendation = recommendations[type] && recommendations[type][nation] && recommendations[type][nation][state];
    if (recommendation) {
      res.json({ recommendation });
    } else {
      res.json({ recommendation: '추천 메뉴가 없습니다.' });
    }
  } else {
    res.status(400).json({ error: 'Invalid request body' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
