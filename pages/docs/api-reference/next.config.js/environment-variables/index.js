import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Переменные среды</h1>
<div className="note">
С момента выпуска Next.js 9.4 мы получили более интуитивный и эргономичный интерфейс для добавления переменных среды. Попробуйте!
</div>

Чтобы добавить переменные среды в пакет JavaScript, откройте next.config.js и добавьте env конфигурацию:

<Highlight language="javascript">
{`module.exports = {
  env: {
    customKey: 'my-value',
  },
}`}
</Highlight>

Теперь вы можете получить доступ process.env.customKey к своему коду. Например:

<Highlight language="javascript">
{`function Page() {
  return <h1>The value of customKey is: {process.env.customKey}</h1>
}

export default Page`}
</Highlight>

Next.js заменит process.env.customKey с 'my-value' во время сборки. Попытка деструктурировать process.env переменные не сработает из-за природы Webpack DefinePlugin.

<p>Например, следующая строка:</p>

<Highlight language="javascript">
{`return <h1>The value of customKey is: {process.env.customKey}</h1>`}
</Highlight>

В конечном итоге будет:
<Highlight language="javascript">
{`return <h1>The value of customKey is: {'my-value'}</h1>`}
</Highlight>

            </div>
        </Docs>
    )
}