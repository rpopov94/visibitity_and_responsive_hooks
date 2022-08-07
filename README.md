# Тестовые задания на реализацию npm модулей

Реализуем на github, публикуем в npm под названием **@имя-вашего-npm-пользователя/название-пакета**, например **@vasya228/react-use**

## React - useDocumentVisibility

Стек: React, typescript (опционален), сборка - microbundle/rollup

Надо реализовать react hook, который
- скажет, активна (видна) ли сейчас вкладку браузера
- скажет, сколько раз с момента инициализации компонента вкладка становилась неактивной (невидимой)
- предоставит функцию, в которой можно подписаться на изменение активности (видимости) текущей вкладки

**Замечание**: речь про "вкладка активна(видна)/неактивна", а не "вкладка в фокусе/не фокусе", это важно.

### Пример работы хука

`useDocumentVisibility.js`

```jsx
import React from 'react'
import { useDocumentVisibility } from '@my-npm-user/react-document-react-visibility'

const LeaveTabCounter = () => {
  const { count, visible, onVisibilityChange } = useDocumentVisibility();

  useEffect(() => {
    onVisibilityChange((isVisible) => {
      console.log('first handler', isVisible)
    });
    onVisibilityChange((isVisible) => {
      console.log('second handler', isVisible)
    });
  }, [])

  return (
    <div>
      <span>
        Вы покинули страницу: {count} раз
        Вкладка активна? {visible ? 'да' : 'нет'}
      </span>
    </div>
  );
};
```