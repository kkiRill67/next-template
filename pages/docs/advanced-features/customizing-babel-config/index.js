import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Настройка Babel Config</h1>
            
Next.js включает в себя next/babelпредустановку для вашего приложения, он включает все необходимое для компиляции приложений React и серверного кода. Но если вы хотите расширить стандартные конфигурации Babel, это тоже возможно.
<p>
Для начала вам нужно только определить .babelrc файл в верхней части вашего приложения, если такой файл будет найден, мы будем считать его источником истины , поэтому он должен также определить, что нужно Next.js, а именно: next/babel предустановки.
</p>

Вот пример .babelrc файла:
<p></p>
<Highlight language="json">
{`{
  "presets": ["next/babel"],
  "plugins": []
}`}
</Highlight>

Вы можете взглянуть на этот файл, чтобы узнать о предустановках, включенных в next/babel.
<p>
Чтобы добавить пресеты / плагины без их настройки , вы можете сделать это следующим образом:
</p>

<Highlight language="json">
{`{
  "presets": ["next/babel"],
  "plugins": ["@babel/plugin-proposal-do-expressions"]
}`}
</Highlight>

Чтобы добавить пресеты / плагины с индивидуальной конфигурацией , сделайте это в next/babelпресете следующим образом:

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

<div className="note">modules Вариант на "preset-env"должно быть сведены к false, в противном случае WebPack код расщепление выключено.</div>

            </div>
        </Docs>
    )
}