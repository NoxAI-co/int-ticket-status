import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FlagIcon } from "@heroicons/react/16/solid";
import ItemSeguimiento from "../components/ItemSeguimiento";
import { Ticket, TicketComment, TicketCommentResponse } from "../types/Ticket";
import calculateTimeRelative from "../helpers/timeRelative";
import ContentLoader from "react-content-loader";

const ViewTicket = () => {
  const { id } = useParams();
  const [ticket, SetTicket] = useState<Ticket>();
  const [comments, setComments] = useState<TicketComment[]>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return;
    fetchTicket(id)
      .then((ticket) => {
        SetTicket(ticket);
        fetchTicketComments(id).then((comments) => {
          const commentsSorted = comments.comments.reverse();
          setComments(commentsSorted);
          setLoading(false);
        });
      })
      .catch(() => {
        navigate(`/`);
        return;
      });
  }, [id, navigate]);
  return (
    <article id={"ticket-" + id} className="p-1 flex flex-col gap-4">
      {loading ? (
        <ContentLoader
          speed={2}
          width="100%"
          height="100%"
          viewBox="0 0 400 160"
          backgroundColor="#e5e7eb"
          foregroundColor="#d9d4d4"
        >
          <rect x="10" y="10" rx="5" ry="5" width="70" height="20" />
          <rect x="10" y="40" rx="5" ry="5" width="50" height="10" />
          <rect x="10" y="60" rx="5" ry="5" width="100" height="20" />
          <rect x="10" y="90" rx="5" ry="5" width="50" height="10" />
          <rect x="300" y="90" rx="5" ry="5" width="50" height="10" />
          <rect x="10" y="120" rx="5" ry="5" width="100" height="20" />
          <rect x="10" y="150" rx="5" ry="5" width="380" height="10" />
          <rect x="10" y="180" rx="5" ry="5" width="380" height="10" />
          <rect x="10" y="200" rx="5" ry="5" width="380" height="10" />
        </ContentLoader>
      ) : (
        <>
          <Link to="/" className="button-secondary">
            <span>Volver</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12">
              <path
                d="M 1 6 L 11 6"
                fill="transparent"
                stroke-width="1.5"
                stroke="currentColor"
                stroke-linecap="round"
              ></path>
              <path
                d="M 7 10 L 11 6 L 7 2"
                fill="transparent"
                stroke-width="1.5"
                stroke="currentColor"
                stroke-linecap="round"
              ></path>
            </svg>
          </Link>
          <header className="flex flex-col">
            <p className="text-sm text-neutral-500">#{id}</p>
            <h1
              className={"text-2xl font-bold "}
              style={{
                color: ticket?.status.color,
              }}
            >
              {ticket?.status.status.toUpperCase()}
            </h1>
            <div className="inline-flex justify-between">
              <p className="text-[#6fddff] text-xs inline-flex gap-1 items-center">
                <FlagIcon className="w-min h-3" />
                {ticket?.priority.priority}
              </p>
              <p className="text-xs text-neutral-500">
                Creado{" "}
                {calculateTimeRelative(
                  ticket ? ticket.date_created : 0
                ).toLowerCase()}
              </p>
            </div>
          </header>
          <hr className="h-0.5 bg-gradient-to-r from-tertiarys to-transparent border-none" />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Descripción</h2>
            <p className="text-sm text-prett">{ticket?.description}</p>
          </div>
          <hr className="h-0.5 bg-gradient-to-r from-transparent via-stone-300 to-transparent border-none" />
          <article className="max-h-[28vh] overflow-auto">
            <h2 className="text-lg font-bold mb-2 bg-white rounded-full w-fit">
              Seguimiento
            </h2>
            <ItemSeguimiento
              created={true}
              fecha={ticket ? ticket.date_created : 0}
              descripcion="El ticket fue creado"
            />
            {comments ? (
              comments.map((comment) => (
                <ItemSeguimiento
                  key={comment.id}
                  fecha={comment.date}
                  descripcion={comment.comment_text}
                />
              ))
            ) : (
              <></>
            )}
          </article>
        </>
      )}
    </article>
  );
};

const fetchTicket = async (id: string): Promise<Ticket> => {
  const resp = await fetch(`https://api.clickup.com/api/v2/task/${id}`, {
    method: "GET",
    headers: {
      Authorization: import.meta.env.VITE_API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (resp.status != 200) throw new Error("Ticket no encontrado");
  return await resp.json();
};

const fetchTicketComments = async (
  id: string
): Promise<TicketCommentResponse> => {
  const resp = await fetch(
    `https://api.clickup.com/api/v2/task/${id}/comment`,
    {
      method: "GET",
      headers: {
        Authorization: import.meta.env.VITE_API_KEY,
        "Access-Control-Allow-Origin": "https://api.clickup.com",
      },
    }
  );
  return await resp.json();
};

export default ViewTicket;
