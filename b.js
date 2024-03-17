// 필요한 모듈 가져오기
const redis = require('ioredis');

// Redis 클라이언트 생성
console.log(redis.createClient())
const client = redis.createClient({
    host: 'localhost', // Redis 서버 호스트
    port: "6379",         // Redis 서버 포트 (기본값은 6379)
});

// Redis 연결 확인
client.on('connect', () => {
    console.log('Redis에 성공적으로 연결되었습니다.');
});

// Redis 연결 에러 처리
client.on('error', (err) => {
    console.error('Redis 연결 오류:', err);
});

// Redis에 데이터 저장 예제
// client.set('example_key', 'Hello, Redis!', (err, reply) => {
//     if (err) {
//         console.error('데이터 저장 실패:', err);
//     } else {
//         console.log('데이터 저장 성공:', reply);
//     }

//     // Redis 연결 종료
//     client.quit();
// });
