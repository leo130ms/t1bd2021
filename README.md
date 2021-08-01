# t1bd2021

verificarConsulta implementado com exemplos. Para Rodar:

temos 3 exemplos, N pode ser 1,2 ou 3:

source query_examples/{N}/db.config

Cada exemplo tem um arquivo qtrue.txt com uma consulta correta e um qerror.txt com consulta inválida.

File pode ser qtrue.txt ou qerror.txt:

node app.js $relax_host $relax_port $relax_database query_examples/{N}/{File}

Estamos usando comando Buffer que está com 'DeprecationWarning'. Usar a flag '--no-warnings' abaixo para evitar esse warning no console:

node --no-warnings app.js $relax_host $relax_port $relax_database query_examples/{N}/{File}