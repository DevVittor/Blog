export default function SendContact() {
  return (
    <div className=" h-auto w-full flex flex-col">
      <div className="flex justify-start items-center p-2 bg-zinc-100">
        Propostas (41)
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 40 }).map((_, index) => (
          <div
            key={index}
            className="p-3 border border-zinc-200 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Jéssica Gomes</h2>
              <span className=" font-light text-sm">Prazo: 15 dias</span>
            </div>
            <div className="">
              <p className="leading-5 text-zinc-700 font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                dolorem nesciunt est quo ratione iure nostrum. Necessitatibus,
                maiores? Obcaecati nulla tempore iusto quae nisi explicabo ad
                aperiam recusandae vitae fugit? Maiores harum dolore veritatis
                illo rem corporis accusantium laborum repudiandae earum dolorum
                eaque placeat aspernatur deserunt, nam obcaecati. Pariatur,
                cumque!
              </p>
            </div>
            <div className="flex justify-between items-center">
              <button className="px-3 py-1 rounded-sm border border-zinc-200 bg-zinc-50 font-medium">
                R$ 240
              </button>
              <button className="bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-sm">
                (11) 998435-302
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
