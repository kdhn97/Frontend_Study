import server from "./server";

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`order_sysetem_server GraphQL 서버가 localhost:${PORT} 에서 실행됩니다...`);
});
