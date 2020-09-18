import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Помощники ответа</h1>
            
<p>Response (res) включает в себя набор методов, подобных Express.js, для улучшения взаимодействия с разработчиками и увеличения скорости создания новых конечных точек API. Взгляните на следующий пример:</p>

<Highlight language="javascript">
    {`export default (req, res) => {
  res.status(200).json({ name: 'Next.js' })
}`}
</Highlight>

Включенные помощники:
<p className="list"> - res.status(code)- Функция для установки кода состояния. codeдолжен быть действительный код статуса HTTP</p>
<p className="list"> - res.json(json)- Отправляет ответ в формате JSON. json должен быть действительным объектом JSON</p>
<p className="list"> - res.send(body)- Отправляет HTTP-ответ. body может быть string, object или Buffer</p>
<p className="list"> - res.redirect([status,] path)- Перенаправляет на указанный путь или URL. status должен быть допустимый код состояния HTTP. Если не указано, по status умолчанию используется «307» «Найдено».</p>
           </div>
        </Docs>
    )
}