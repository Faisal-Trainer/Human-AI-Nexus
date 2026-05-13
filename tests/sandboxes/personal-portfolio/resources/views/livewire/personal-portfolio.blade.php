
    <div class="max-w-6xl mx-auto space-y-20 pb-20">
        <section class="grid lg:grid-cols-2 gap-20 items-center py-20">
            <div class="space-y-8">
                <div class="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Available for Hire</div>
                <h1 class="text-7xl font-black leading-none">I Build <span class="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-600">Digital Worlds</span>.</h1>
                <p class="text-xl text-slate-500 leading-relaxed max-w-md">Senior Creative Developer specializing in Nexus-powered experiences and AI orchestration.</p>
                <div class="flex gap-4">
                    <button class="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black shadow-2xl hover:scale-105 transition-all">My Work</button>
                    <button class="bg-white border-2 border-slate-100 px-10 py-5 rounded-3xl font-black hover:bg-slate-50 transition-all">Contact Me</button>
                </div>
            </div>
            <div class="relative">
                <div class="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div class="bg-white p-4 rounded-[60px] shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700">
                    <div class="aspect-square bg-slate-100 rounded-[50px] overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Faisal" class="w-full h-full object-cover">
                    </div>
                </div>
            </div>
        </section>

        <section class="space-y-10">
            <h2 class="text-3xl font-black">Featured Projects</h2>
            <div class="grid md:grid-cols-3 gap-8">
                @foreach($items as $item)
                    <div class="group bg-white dark:bg-slate-900 p-2 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all">
                        <div class="aspect-video bg-slate-50 dark:bg-slate-800 rounded-[30px] mb-6 flex items-center justify-center text-4xl">🚀</div>
                        <div class="px-6 pb-6">
                            <h3 class="text-xl font-black mb-2">{{ $item->name }}</h3>
                            <p class="text-sm text-slate-400 font-bold uppercase tracking-widest mb-6">{{ $item->tech }}</p>
                            <a href="{{ $item->url }}" class="inline-flex items-center gap-2 text-indigo-600 font-black group-hover:gap-4 transition-all">View Case Study <span>→</span></a>
                        </div>
                    </div>
                @endforeach
            </div>
        </section>
    </div>