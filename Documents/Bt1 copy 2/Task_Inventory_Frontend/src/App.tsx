import { useEffect, useState, type JSX } from "react";
import { Todos } from "./Todos";
import Card from "./Components/Pagination";
import TabComponent from "./Components/TabsComponen";

const App = (): JSX.Element => {
  const [todos, setData] = useState([]);
  const [totalTask, setTotalTask] = useState(0);
  const [totalTaskDone, setTotalTaskDone] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [avgCompletionTimes,setAvgCompletionTimes]=useState([])
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [filterName,setFilterName]=useState('')


  const GetTodos = async (page: number) => {
    const params = new URLSearchParams({
      nameFilter: filterName,
      priorityFilter: filter === 'all' ? '' : filter,
      isDoneFilter: "",
      pageNumber: page.toString(),
    });

    try {
      const url = `http://localhost:9090/tasks/all?${params.toString()}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        console.error("Error en la petición:", response.status);
        return;
      }

      const result = await response.json();
      setData(result.tasks || []);
      setAvgCompletionTimes(result.avgCompletionTimes)
      setTotalTask(result.TotalTask || 0);
      setTotalTaskDone(result.TotalTaskCompleted || 0);
      setTotalPages(result.totalPages || 0);
      setCurrentPage(result.currentPage || page);
      console.log(result);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  useEffect(() => {
    GetTodos(0);
  }, [filter,filterName]);

  return (
    <div className="todoapp relative z-50 pointer-events-auto">
      <header className="header">
        <TabComponent totalTask={totalTask} totalTaskDone={totalTaskDone} avgCompletionTimes={avgCompletionTimes} onFilterChange={(selectedFilter) => {
                                                                                                                    setFilter(selectedFilter); }}
            onFilterNameChange={(text) => {
                  setFilterName(text);
                  console.log('Texto del filtro:', text);
                  GetTodos(0);
            }}/>
      </header>
      <Todos todos={todos} />

      {totalPages > 1 && (
        <Card
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            console.log("Click en página:", page);
            GetTodos(page);
          }}
        />
      )}

      <footer className="footer p-4 flex flex-col items-center gap-4"/>
    </div>
  );
};

export default App;