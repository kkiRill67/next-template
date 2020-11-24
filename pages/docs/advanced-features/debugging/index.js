import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Отладка</h1>
            
В этой документации объясняется, как вы можете отлаживать внешний и внутренний код Next.js с полной поддержкой исходных карт с помощью Chrome DevTools или отладчика VSCode.

<p>
Для этого необходимо сначала запустить приложение Next.js в режиме отладки в одном терминале, а затем подключить к нему инспектор (Chrome DevTools или VS Code).
</p>

Может быть больше способов отладки приложения Next.js, поскольку все, что ему требуется - это открыть отладчик Node.js и запустить клиент-инспектор. Вы можете найти более подробную информацию в документации Node.js.

<h2>Шаг 1. Запустите Next.js в режиме отладки</h2>

Next.js является приложением Node.js, и все, что нам нужно сделать, это передать <span className="spanTag">--inspect</span> флаг базовому процессу Node.js, чтобы он запустился в режиме отладки.
<p>Сначала запустите Next.js с флагом проверки:</p>


<Highlight language="json">
{`NODE_OPTIONS='--inspect' next dev`}
</Highlight>

Если вы используете <span className="spanTag">npm run dev</span> или <span className="spanTag">yarn dev</span>(см.: Начало работы), вам следует обновить devскрипт на своем <span className="spanTag">package.json</span>:

<Highlight language="json">
{`"dev": "NODE_OPTIONS='--inspect' next dev"`}
</Highlight>

Результат запуска Next.js с флагом <span className="spanTag">inspect</span> выглядит так:

<Highlight language="json">
{`Debugger listening on ws://127.0.0.1:9229/0cf90313-350d-4466-a748-cd60f4e47c95
For help, see: https://nodejs.org/en/docs/inspector
ready - started server on http://localhost:3000`}
</Highlight>

<div className="note">
Имейте в виду, что использование NODE_OPTIONS='--inspect' npm run dev или NODE_OPTIONS='--inspect' yarn dev не будет работать. Это попытается запустить несколько отладчиков на одном порте: один для процесса npm/yarn и один для Next.js. Тогда вы получите сообщение об ошибке, как Starting inspector on 127.0.0.1:9229 failed: address already in use на вашей консоли.
</div>

<h2>Шаг 2. Подключитесь к отладчику</h2>
<h3>Использование Chrome DevTools</h3>

Как только вы откроете новую вкладку в Google Chrome и перейдете к <span className="spanTag">chrome://inspect</span>, вы должны увидеть свое приложение Next.js в разделе «Удаленная цель». Теперь нажмите «проверить», чтобы открыть экран, который с этого момента будет вашей средой отладки.

<h3>Использование отладчика в коде Visual Studio</h3>

Мы будем использовать режим присоединения VS Code, чтобы присоединить инспектор VS Code к нашему работающему отладчику, запущенному на шаге 1.
<p>
Создайте файл с именем <span className="spanTag">.vscode/launch.json</span> в корне вашего проекта с этим содержимым:    
</p>


<Highlight language="json">
{`{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "port": 9229
    }
  ]
}`}
</Highlight>

Теперь нажмите F5 или выберите «Отладка: начать отладку» на палитре команд, и вы можете начать сеанс отладки.

<h2>Шаг 3. Установите точки останова и посмотрите, что произойдет.</h2>

Теперь вы можете использовать <span className="spanTag">debugger</span> оператор, чтобы приостановить выполнение кода серверной части или внешнего интерфейса в любое время, когда вы хотите более точно наблюдать и отлаживать свой код.
<p>
Если вы запускаете базовый код, обновляя текущую страницу, щелкая ссылку на страницу или выбирая маршрут API, ваш код будет приостановлен, и появится окно отладчика.
</p>


            </div>
        </Docs>
    )
}