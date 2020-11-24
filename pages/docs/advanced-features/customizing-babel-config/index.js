import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Настройка Babel Config</h1>
            
Next.js включает в себя <span className="spanTag">next/babel</span> предустановку для вашего приложения, он включает все необходимое для компиляции приложений React и серверного кода. Но если вы хотите расширить стандартные конфигурации Babel, это тоже возможно.
<p>
Для начала вам нужно только определить <span className="spanTag">.babelrc</span> файл в верхней части вашего приложения, если такой файл будет найден, мы будем считать его источником истины, поэтому он должен также определить, что нужно Next.js, а именно: <span className="spanTag">next/babel</span> предустановки.
</p>

Вот пример <span className="spanTag">.babelrc</span> файла:
<p></p>
<Highlight language="json">
{`{
  "presets": ["next/babel"],
  "plugins": []
}`}
</Highlight>

Вы можете взглянуть на этот файл, чтобы узнать о предустановках, включенных в <span className="spanTag">next/babel</span>.
<p>
Чтобы добавить пресеты/плагины без их настройки, вы можете сделать это следующим образом:
</p>

<Highlight language="json">
{`{
  "presets": ["next/babel"],
  "plugins": ["@babel/plugin-proposal-do-expressions"]
}`}
</Highlight>

Чтобы добавить пресеты/плагины с индивидуальной конфигурацией, сделайте это в <span className="spanTag">next/babel</span> пресете следующим образом:

<Highlight language="json">
{`{
  "presets": [
    [
      "next/babel",
      {
        "preset-env": {},
        "transform-runtime": {},
        "styled-jsx": {},
        "class-properties": {}
      }
    ]
  ],
  "plugins": []
}`}
</Highlight>

Чтобы узнать больше о доступных параметрах для каждой конфигурации, посетите их сайт документации.
<p></p>
<div className="note">Next.js использует текущую версию Node.js для компиляций на стороне сервера.</div>

<div className="note"><span className="spanTag">modules</span> Вариант на <span className="spanTag">preset-env</span> должно быть сведены к false, в противном случае WebPack код расщепление выключено.</div>

            </div>
        </Docs>
    )
}