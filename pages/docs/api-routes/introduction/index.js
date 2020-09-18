import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>API-маршруты</h1>
            
<p>
Маршруты API предоставляют простое решение для создания вашего API с помощью Next.js.
</p>
<p>
Любой файл внутри папки pages/api сопоставляется /api/* и будет рассматриваться как конечная точка API, а не как page. Это пакеты только на стороне сервера и не увеличивают размер пакета на стороне клиента.
</p>

Например, следующий маршрут API pages/api/user.js обрабатывает json ответ:

<Highlight language="javascript">
    {`export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ name: 'John Doe' }))
}`}
</Highlight>

Чтобы маршрут API работал, вам необходимо экспортировать по умолчанию функцию (также известную как обработчик запросов ), которая затем получает следующие параметры:
<p className='list'> - req: Экземпляр http.IncomingMessage, а также несколько готовых промежуточных программ, которые вы можете увидеть здесь</p>
<p className='list'> - res: Экземпляр http.ServerResponse, а также некоторые вспомогательные функции, которые вы можете увидеть здесь</p>


Чтобы обрабатывать различные методы HTTP в маршруте API, вы можете использовать req.method в своем обработчике запросов, например:

<Highlight language="javascript">
    {`export default (req, res) => {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}`}
</Highlight>

Чтобы получить конечные точки API, взгляните на любой из примеров в начале этого раздела.
<h2>Предостережения</h2>
<p className='list'> - В маршрутах API не указаны заголовки CORS, то есть они имеют одинаковое происхождение только по умолчанию. Вы можете настроить такое поведение, обернув обработчик запросов промежуточным ПО cors.</p>
<p className='list'> - API-маршруты нельзя использовать с next export</p>
            </div>
        </Docs>
    )
}