import { useContext } from "react";
import { CyclesContext } from "../../Contexts/CyclesContexts";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export function History() {

    const { cycles } = useContext(CyclesContext);


    return (

        <HistoryContainer>

            <h1>Meu histórico</h1>


            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle) => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>{formatDistance(new Date(cycle.startDate), new Date(), { addSuffix: true, locale: ptBR })}</td>
                                    <td>
                                        {cycle.finishedDate && <Status statusColor="green">Concluido</Status>}
                                        {cycle.interruptedDate && <Status statusColor="red">Interrompido</Status>}
                                        {!cycle.finishedDate && !cycle.interruptedDate && <Status statusColor="yellow">Em andamento</Status>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>

        </HistoryContainer>

    )
}