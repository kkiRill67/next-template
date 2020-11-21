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
Любой файл внутри папки <span className="spanTag">pages/api</span> сопоставляется <span className="spanTag">/api/*</span> и будет рассматриваться как конечная точка API, а не как <span className="spanTag">page</span>. Это пакеты только на стороне сервера и не увеличивают размер пакета на стороне клиента.
</p>

Например, следующий маршрут API <span className="spanTag">pages/api/user.js</span> обрабатывает <span className="spanTag">json</span> ответ:

<Highlight language="javascript">
    {`export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ name: 'John Doe' }))
}`}
</Highlight>

Чтобы маршрут API работал, вам необходимо экспортировать по умолчанию функцию (также известную как обработчик запросов ), которая затем получает следующие параметры:
<p className='list'> - <span className="spanTag">req</span>: Экземпляр <span className="spanTag">http.IncomingMessage</span>, а также несколько готовых промежуточных программ, которые вы можете увидеть здесь</p>
<p className='list'> - <span className="spanTag">res</span>: Экземпляр <span className="spanTag">http.ServerResponse</span>, а также некоторые вспомогательные функции, которые вы можете увидеть здесь</p>


Чтобы обрабатывать различные методы HTTP в маршруте API, вы можете использовать <span className="spanTag">req.method</span> в своем обработчике запросов, например:

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
<p className='list'> - В маршрутах API не указаны заголовки <span className="spanTag">CORS</span>, то есть они имеют одинаковое происхождение только по умолчанию. Вы можете настроить такое поведение, обернув обработчик запросов промежуточным ПО <span className="spanTag">cors</span>.</p>
<p className='list'> - API-маршруты нельзя использовать с <span className="spanTag">next export</span></p>
            </div>
        </Docs>
    )
}