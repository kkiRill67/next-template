import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Помощники ответа</h1>
            
<p>Response (<span className="spanTag">res</span>) включает в себя набор методов, подобных Express.js, для улучшения взаимодействия с разработчиками и увеличения скорости создания новых конечных точек API. Взгляните на следующий пример:</p>

<Highlight language="javascript">
    {`export default (req, res) => {
  res.status(200).json({ name: 'Next.js' })
}`}
</Highlight>

Включенные помощники:
<p className="list"> - <span className="spanTag">res.status(code)</span>- Функция для установки кода состояния. <span className="spanTag">code</span> должен быть действительный код статуса HTTP</p>
<p className="list"> - <span className="spanTag">res.json(json)</span>- Отправляет ответ в формате JSON. <span className="spanTag">json</span> должен быть действительным объектом JSON</p>
<p className="list"> - <span className="spanTag">res.send(body)</span>- Отправляет HTTP-ответ. <span className="spanTag">body</span> может быть <span className="spanTag">string</span>, <span className="spanTag">object</span> или <span className="spanTag">Buffer</span></p>
<p className="list"> - <span className="spanTag">res.redirect([status,] path)</span>- Перенаправляет на указанный путь или URL. <span className="spanTag">status</span> должен быть допустимый код состояния HTTP. Если не указано, по <span className="spanTag">status</span> умолчанию используется «307» «Найдено».</p>
           </div>
        </Docs>
    )
}