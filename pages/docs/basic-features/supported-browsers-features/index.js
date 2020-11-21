import Docs from '../../../../components/Docs/Docs'

export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Поддерживаемые браузеры и функции</h1>
            
            <p>
            Next.js поддерживает IE11 и все современные браузеры (Edge, Firefox, Chrome, Safari, Opera и др.) Без необходимости настройки.
            </p>

<h2>Полифиллы</h2>
<p>
Мы прозрачно вводим полифиллы, необходимые для совместимости с IE11. Кроме того, мы внедряем широко используемые полифиллы, в том числе:
</p>
<p className='list'>
 - <span className="spanTag">fetch ()</span> - Замена: <span className="spanTag">whatwg-fetch</span> и <span className="spanTag">unfetch</span>.
</p>
<p className='list'>
 - <span className="spanTag">URL</span> - Замена: <span className="spanTag">url</span> пакет (API Node.js) .
</p>
<p className='list'>
 - <span className="spanTag">Object.assign ()</span> - Замена: <span className="spanTag">object-assign</span>, <span className="spanTag">object.assign</span> и <span className="spanTag">core-js/object/assign</span>.
</p>
<p>
Если какая-либо из ваших зависимостей включает эти полифилы, они будут автоматически удалены из производственной сборки, чтобы избежать дублирования.
</p>
<p>
Кроме того, чтобы уменьшить размер пакета, Next.js будет загружать эти полифилы только для браузеров, которым они необходимы. Большинство веб-трафика по всему миру не загружает эти полифилы.
</p>

<h3>Полифиллы на стороне сервера</h3>

В дополнение к <span className="spanTag">fetch()</span> на стороне клиента, Next.js полифицируется <span className="spanTag">fetch()</span> в среде Node.js. Вы можете использовать <span className="spanTag">fetch()</span> на своем сервере код (например, <span className="spanTag">getStaticProps</span>) без использования полифиллов, таких как <span className="spanTag">isomorphic-unfetch</span> или <span className="spanTag">node-fetch</span>.

<h3>Пользовательские полифиллы</h3>

<p>
Если ваш собственный код или какие-либо внешние зависимости <span className="spanTag">npm</span> требуют функций, не поддерживаемых вашими целевыми браузерами, вам нужно добавить полифиллы самостоятельно.
</p>
<p>
В этом случае вам следует добавить импорт верхнего уровня для конкретного полифила, который вам нужен в вашем Custom <span className="spanTag">{`<App>`}</span> или отдельном компоненте.
</p>

<h2>
Возможности языка JavaScript
</h2>
<p>
Next.js позволяет использовать новейшие функции JavaScript из коробки. В дополнение к функциям ES6 Next.js также поддерживает:
</p>

<p className='list'>
 - Асинхронный / ожидающий (ES2017)
</p>
<p className='list'>
 - Свойства объекта Rest / Spread (ES2018)
</p>
<p className='list'>
 - Динамический <span className="spanTag">import()</span> (ES2020)
</p>
<p className='list'>
 - Дополнительная цепочка (ES2020)
</p>
<p className='list'>
 - Нулевое слияние (ES2020)
</p>
<p className='list'>
 - Поля классов и статические свойства (часть предложения этапа 3)
</p>
<p className='list'>
 - и больше!    
</p>


<h3>Возможности TypeScript</h3>
Next.js имеет встроенную поддержку TypeScript. Узнайте больше здесь .

<h3>
Настройка Babel Config (Дополнительно)
</h3>
Вы можете настроить конфигурацию babel. Узнайте больше здесь .
            </div>
        </Docs>
    )
}