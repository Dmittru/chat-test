'use client'
import Image from "next/image";
import {formatDate, formatTime, timeFromNow} from "@/shared/lib/formatDate";
import {formatMessage} from "@/shared/ui/message/lib/formatMessage/formatMessage";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <div className={'main-page'}>
                <h1 className={'main-page__header'}>
                    Привет! Это выполненный таск с чатом
                </h1>
                <p>
                    Отсюда, 2 задача:
                </p>
                <Link
                    target={'_blank'}
                    href={'https://joytechnology.notion.site/Frontend-0868814b407f4df690942907143362d8'}
                >
                    Ссылка на Notion&nbsp;
                </Link>
                <Link
                    target={'_blank'}
                    href={'https://www.figma.com/design/hgSImYCBrTDjY3tSk564Yy/Chat-UI-kit-(Community)?node-id=2-1335&t=SiHvIbGyq24qXYWg-0'}
                >
                    Ссылка на Figma
                </Link>
                <p>
                    Краткий саммари по проделанной работе:
                </p>
                <ul>
                    <li>
                        Полностью выполнено тз с указанным стеком
                    </li>
                    <li>
                        Добавлены фичи взаимодействия с чатом (будет описано в приветственном сообщении)
                    </li>
                    <li>
                        Добавлена тёмная тема
                    </li>
                    <li>
                        Ушло времени около 30 часов
                    </li>
                    <li>
                        Очень тяжёлой была работа с AntDesign. Очень негибко повёл себя ui kit, особенно в кастомизации
                        напрямую и работы с темами приложения
                    </li>
                </ul>
                <Link
                    className={'main-page__main-link'}
                    href={'/chat'}
                >
                    Перейти к проекту
                </Link>
            </div>
        </main>
    );
}
