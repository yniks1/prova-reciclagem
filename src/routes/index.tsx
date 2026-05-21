import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, GraduationCap, ArrowRight, Trophy } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prova Conhecimento Técnico - Assistme" },
      { name: "description", content: "Página interativa de prova para treinamento corporativo." },
    ],
  }),
  component: QuizPage,
});

type Question = {
  prompt: string;
  options: string[];
  correctIndex: number;
};

const QUESTIONS: Question[] = [
  {
    prompt: "1 - Cálculo de Excedente:\n\n| Rota total: 650km\n| Plano do cliente: 400km\n | Tipo do veículo: LEVE\n| Valor médio do km excedente: R$3,50\n\n| Qual será o valor de excedente gerado para o associado?",
    options: [
      "R$1.400,00",
      "R$525,00",
      "Não haverá excedente",
      "R$375,00",
    ],
    correctIndex: 2,
  },
  {
    prompt: "2 - O que caracteriza rodas travadas em um automóvel?",
    options: [
      "Quando a roda está solta.",
      "Quando a roda não gira para os lados, somente para frente e para trás.",
      "Quando a roda não gira para subir no reboque.",
      "Quando a roda está fazendo um barulho.",
    ],
    correctIndex: 2,
  },
  {
    prompt: "3 - Caso prático:\n\nO condutor entrou em contato informando pane elétrica/mecânica. Havia 4 pessoas no veículo no momento do atendimento.\n\nPlano: Automóvel - Plano 150KM\n\nResponda:\nInforme a quilometragem disponível para reboque e Taxi.",
    options: [
      "Reboque 250km e taxi 400km.",
      "Reboque 150km e taxi 201km",
      "Reboque 300km e taxi 150km",
      "Reboque 300km e taxi 200km",
    ],
    correctIndex: 3,
  },
  {
    prompt: "4 - Qual é a instrução padrão para veículos que se encontram em oficina e desejam remoção para outra oficina, residência ou outros:",
    options: [
      "Informar ao associado que não é possível seguir com a remoção do veículo por estar em uma oficina, registrar a negativa e instruir a contatar o ADM para pedir liberação.",
      "Se o mecânico colocar o veículo na via, podemos abrir o serviço pois agora se encontra fora da oficina.",
      "Informar ao associado que não é possível seguir com a remoção do veículo por estar em uma oficina e registrar a negativa.",
      "Remover o veículo quando estiver na porta da oficina.",
    ],
    correctIndex: 2,
  },
  {
    prompt: "5 - Por qual motivo veículo atolado não possui cobertura?",
    options: [
      "Porque o plano do associado é o mais básico.",
      "Porque corre o risco de atolar o caminhão reboque também.",
      "Porque o associado quem quis atolar.",
      "Porque o associado foi quem se colocou naquela situação.",
    ],
    correctIndex: 1,
  },
  {
    prompt: "6 - O que caracteriza estradas de terra?",
    options: [
      "Vias de difícil acesso.",
      "Vias não cadastradas.",
      "Vias onde o caminhão reboque não entra.",
      "Vias não pavimentadas.",
    ],
    correctIndex: 3,
  },
  {
    prompt: "7 - O que caracteriza carro de apoio?",
    options: [
      "Veículo de porte pequeno utilizado para auxiliar o reboque nas remoções onde o caminhão reboque não conseguir entrar.",
      "Caminhão enviado para o local para dar suporte onde o caminhão reboque não conseguir entrar.",
      "Uma moto enviada ao local para puxar o carro do associado.",
      "Caminhão reboque.",
    ],
    correctIndex: 0,
  },
  {
    prompt: "8 - Quando o condutor é orientado a se dirigir à oficina mais próxima, qual é o raio máximo permitido?",
    options: [
      "150km totais.",
      "40km totais.",
      "80km totais.",
      "200km totais.",
    ],
    correctIndex: 3,
  },
  {
    prompt: "9 - Qual é a importância de solicitar a pesquisa de satisfação em 100% das chamadas realizadas pela Central de Atendimento?",
    options: [
      "Para saber quantos atendimentos tivemos no dia.",
      "Para guardar os números de satisfação.",
      "Para que a empresa possa controlar os funcionários em todos os atendimentos.",
      "Para mantermos um padrão em toda a assistência acima de 95% de satisfação.",
    ],
    correctIndex: 3,
  },
  {
    prompt: "10 - Quais são os tipos de reboque utilizados em remoções feitas pela Central de Atendimento?",
    options: [
      "Plataforma e lança.",
      "Plataforma, lança, zero grau, asa delta, munk e quinta roda.",
      "Plataforma, lança, zero grau, asa delta e munk.",
      "Plataforma, lança, carretinha, asa delta, munk e zero grau.",
    ],
    correctIndex: 1,
  }
];

function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[current];
  const answered = selected !== null;
  const isCorrect = answered && selected === question.correctIndex;
  const total = QUESTIONS.length;
  const score = answers.reduce(
    (acc, a, i) => acc + (a === QUESTIONS[i].correctIndex ? 1 : 0),
    0,
  );

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-blue-200 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center gap-3 text-slate-800">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
          <GraduationCap className="h-6 w-6 text-slate-900" />
           </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-800">
              Treinamento
            </p>
            <h1 className="text-2xl font-bold sm:text-3xl text-slate-900">Prova Conhecimento Técnico - Assistme</h1>
          </div>
        </header>

        {finished ? (
             <section className="rounded-3xl bg-white border-t-4 border-t-orange-500 p-6 shadow-[var(--shadow-soft)] sm:p-10">            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gradient-accent)] shadow-[var(--shadow-soft)]">
              <Trophy className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Prova concluída!
            </h2>
            <p className="mt-2 text-muted-foreground">Confira seu desempenho abaixo.</p>
            <p className="mt-6 text-5xl font-extrabold text-[var(--brand-blue-deep)]">
              {score}<span className="text-2xl text-muted-foreground">/{total}</span>
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--brand-orange)]">
              {Math.round((score / total) * 100)}% de aproveitamento
            </p>

            <ul className="mt-8 space-y-2 text-left">
              {QUESTIONS.map((q, i) => {
                const ok = answers[i] === q.correctIndex;
                return (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border bg-white p-3"
                  >
                    {ok ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--brand-blue)]" />
                    ) : (
                      <XCircle className="h-5 w-5 shrink-0 text-[var(--brand-orange)]" />
                    )}
                    <span className="text-sm text-foreground">
                      <strong>Questão {String(i + 1).padStart(2, "0")}:</strong>{" "}
                      {ok
                        ? "correta"
                        : `incorreta (correta: ${String.fromCharCode(65 + q.correctIndex)})`}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex justify-center w-full">
            <button
              onClick={handleRestart}
             
             className="inline-flex items-center justify-center gap-3 rounded-2xl bg-orange-500 hover:bg-orange-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105"
             >
             <RotateCcw className="h-6 w-6" />
              Refazer prova
              </button>
              </div>
          </section>
        ) : (
          <section className="rounded-3xl bg-white p-6 shadow-[var(--shadow-soft)] sm:p-10">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-[oklch(0.45_0.18_255/0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--brand-blue-deep)]">
                Questão {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Escolha apenas uma alternativa
              </span>
            </div>

          <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-orange-500 transition-all duration-500 ease-out"
                style={{ width: `${((current + 1) / total) * 100}%` }}
                 />
              </div>

            <h2 className="mb-8 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
              {question.prompt}
            </h2>

            <ul className="space-y-3">
              {question.options.map((opt, i) => {
                const isSel = selected === i;
                const isRight = i === question.correctIndex;
                const showRight = answered && isRight;
                const showWrong = answered && isSel && !isRight;

                return (
                  <li key={i}>
                    <button
                      type="button"
                      disabled={answered}
                      onClick={() => setSelected(i)}
                      className={[
                        "group flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all",
                        "disabled:cursor-not-allowed",
                        showRight
                          ? "border-[var(--brand-blue)] bg-[oklch(0.45_0.18_255/0.08)]"
                          : showWrong
                          ? "border-[var(--brand-orange)] bg-[oklch(0.72_0.18_55/0.08)]"
                          : answered
                          ? "border-border bg-white opacity-60"
                          : "border-border bg-white hover:border-[var(--brand-orange)] hover:shadow-[var(--shadow-glow)]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors",
                          showRight
                            ? "bg-[var(--brand-blue)] text-white"
                            : showWrong
                            ? "bg-[var(--brand-orange)] text-white"
                            : "bg-secondary text-foreground group-hover:bg-[var(--brand-orange)] group-hover:text-white",
                        ].join(" ")}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 text-base font-medium text-foreground">
                        {opt}
                      </span>
                      {showRight && <CheckCircle2 className="h-6 w-6 text-[var(--brand-blue)]" />}
                      {showWrong && <XCircle className="h-6 w-6 text-[var(--brand-orange)]" />}
                    </button>
                  </li>
                );
              })}
            </ul>

            {answered && (
              <div
                className={[
                  "mt-8 flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between",
                  isCorrect
                    ? "bg-[oklch(0.45_0.18_255/0.08)] text-[var(--brand-blue-deep)]"
                    : "bg-[oklch(0.72_0.18_55/0.1)] text-[oklch(0.4_0.14_50)]",
                ].join(" ")}
              >
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider">
                    {isCorrect ? "Resposta correta!" : "Resposta incorreta"}
                  </p>
                  <p className="mt-1 text-sm opacity-90">
                    {isCorrect
                      ? "Excelente! Você acertou a questão."
                      : `A alternativa correta é a letra ${String.fromCharCode(
                          65 + question.correctIndex,
                        )}.`}
                  </p>
                </div>
                  <button
                    onClick={handleNext} 
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--gradient-accent)] px-5 py-3 text-sm font-semibold text-slate-900 shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.02]"
                   >
                  {current + 1 >= total ? "Finalizar" : "Próxima questão"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </section>
        )}

        <p className="mt-6 text-center text-base text-slate-900">
          Desenvolvido por Yago | Setor de Qualidade
        </p>
      </div>
    </main>
  );
}
