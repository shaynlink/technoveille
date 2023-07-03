import ViewCounter from './components/page/ViewCounter/ViewCounter';
import NewsList from './components/page/NewsList/NewsList';
import Articles from './components/Articles/Articles';

export default function Home() {
  return (
    <main className="container mx-auto">
      <section className="flex flex-col gap-y-10 space-y-10 mx-auto max-w-7xl sm:px-6 lg:px-8 my-40">
        <div>
          <h1 className="text-2xl font-bold first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left">Welcome to shaynlink&apos;s technology news watching</h1>
          <ViewCounter />
        </div>

        <div>
          <p className="text-xl font-semibold">This website follow their news website:</p>
          <NewsList />
        </div>
      </section>

      <section>
        <h1 className="text-2xl font-semibold first-letter:text-4xl">News technologic</h1>

        <div className="grid grid-cols-2 gap-5">
          <Articles />
        </div>
      </section>
    </main>
  )
}
