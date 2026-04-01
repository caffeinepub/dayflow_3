import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActor } from "@/hooks/useActor";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Cake, Loader2, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SEED_BIRTHDAYS = [
  { name: "Appenteng", birthMonth: 1, birthDay: 2 },
  { name: "Phoebe", birthMonth: 1, birthDay: 13 },
  { name: "Obed", birthMonth: 1, birthDay: 18 },
  { name: "Elizabeth", birthMonth: 1, birthDay: 31 },
  { name: "Ernest", birthMonth: 2, birthDay: 18 },
  { name: "Elizabeth (Feb)", birthMonth: 2, birthDay: 29 },
  { name: "Adu Gyamfi", birthMonth: 3, birthDay: 2 },
  { name: "Eva", birthMonth: 3, birthDay: 2 },
  { name: "Celebtina", birthMonth: 3, birthDay: 31 },
  { name: "Penuel", birthMonth: 4, birthDay: 8 },
  { name: "Kezia", birthMonth: 4, birthDay: 26 },
  { name: "Rose", birthMonth: 5, birthDay: 5 },
  { name: "Ernestina", birthMonth: 5, birthDay: 25 },
  { name: "Emmanuel Antwi", birthMonth: 5, birthDay: 27 },
  { name: "Elienia", birthMonth: 6, birthDay: 2 },
  { name: "Manasseh", birthMonth: 6, birthDay: 2 },
  { name: "Dr Elizabeth", birthMonth: 6, birthDay: 15 },
  { name: "Malak", birthMonth: 6, birthDay: 27 },
  { name: "Reuben", birthMonth: 7, birthDay: 5 },
  { name: "Becky", birthMonth: 7, birthDay: 5 },
  { name: "Patience", birthMonth: 7, birthDay: 13 },
  { name: "Evans", birthMonth: 7, birthDay: 19 },
  { name: "Sonia", birthMonth: 7, birthDay: 28 },
  { name: "Abeiku", birthMonth: 8, birthDay: 4 },
  { name: "Ewurama", birthMonth: 8, birthDay: 5 },
  { name: "Emmanuel", birthMonth: 8, birthDay: 12 },
  { name: "Emmanuella", birthMonth: 8, birthDay: 12 },
  { name: "Aaron", birthMonth: 8, birthDay: 22 },
  { name: "Maabena", birthMonth: 9, birthDay: 10 },
  { name: "Angelica", birthMonth: 9, birthDay: 13 },
  { name: "Adobea", birthMonth: 9, birthDay: 13 },
  { name: "Maameyaa", birthMonth: 10, birthDay: 25 },
  { name: "Nana Yaw", birthMonth: 10, birthDay: 30 },
  { name: "David", birthMonth: 10, birthDay: 17 },
  { name: "Andriana", birthMonth: 11, birthDay: 2 },
  { name: "Elliot", birthMonth: 11, birthDay: 5 },
  { name: "Emmanuel Adu", birthMonth: 11, birthDay: 27 },
  { name: "Shawn", birthMonth: 12, birthDay: 17 },
];

function getDaysInMonth(month: number): number {
  return new Date(2024, month, 0).getDate();
}

function daysUntilBirthday(month: number, day: number): number {
  const today = new Date();
  const thisYear = today.getFullYear();
  let next = new Date(thisYear, month - 1, day);
  if (next < today) {
    next = new Date(thisYear + 1, month - 1, day);
  }
  const todayMidnight = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  return Math.round((next.getTime() - todayMidnight.getTime()) / 86400000);
}

function formatBirthday(month: number, day: number): string {
  return `${MONTHS[month - 1]} ${day}`;
}

export default function BirthdayCard() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [saving, setSaving] = useState(false);
  const seeded = useRef(false);

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["birthdays"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listContacts();
    },
    enabled: !!actor && !isFetching,
  });

  // Auto-seed birthdays on first load when list is empty
  useEffect(() => {
    if (seeded.current || isLoading || !actor || contacts.length > 0) return;
    seeded.current = true;
    (async () => {
      for (const b of SEED_BIRTHDAYS) {
        try {
          await actor.addContact({
            name: b.name,
            birthMonth: BigInt(b.birthMonth),
            birthDay: BigInt(b.birthDay),
          });
        } catch {
          // ignore duplicates
        }
      }
      await queryClient.invalidateQueries({ queryKey: ["birthdays"] });
    })();
  }, [actor, contacts.length, isLoading, queryClient]);

  const handleAdd = async () => {
    if (!name.trim() || !month || !day || !actor) return;
    setSaving(true);
    try {
      await actor.addContact({
        name: name.trim(),
        birthMonth: BigInt(month),
        birthDay: BigInt(day),
      });
      await queryClient.invalidateQueries({ queryKey: ["birthdays"] });
      setName("");
      setMonth("");
      setDay("");
      setAdding(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (contactName: string) => {
    if (!actor) return;
    await actor.deleteContact(contactName);
    await queryClient.invalidateQueries({ queryKey: ["birthdays"] });
  };

  const sorted = [...contacts].sort((a, b) => {
    const da = daysUntilBirthday(Number(a.birthMonth), Number(a.birthDay));
    const db = daysUntilBirthday(Number(b.birthMonth), Number(b.birthDay));
    return da - db;
  });

  const upcoming = sorted.filter(
    (c) => daysUntilBirthday(Number(c.birthMonth), Number(c.birthDay)) <= 7,
  );
  const rest = sorted.filter(
    (c) => daysUntilBirthday(Number(c.birthMonth), Number(c.birthDay)) > 7,
  );

  const daysInSelectedMonth = month ? getDaysInMonth(Number(month)) : 31;

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-df-navy-mid shadow-card card-glow flex flex-col min-h-[340px] p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-pink-500/10 flex items-center justify-center">
          <Cake className="w-4 h-4 text-pink-400" />
        </div>
        <h3 className="text-sm font-semibold text-df-text">Birthdays</h3>
        <button
          type="button"
          onClick={() => setAdding((v) => !v)}
          data-ocid="birthdays.open_modal_button"
          className="ml-auto p-1.5 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Add form */}
      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mb-4"
          >
            <div className="flex flex-col gap-2 p-3 bg-df-navy-light rounded-xl border border-white/[0.06]">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Person's name..."
                data-ocid="birthdays.input"
                className="bg-df-navy-mid border-white/[0.06] text-df-text placeholder:text-df-text-muted text-sm h-8"
              />
              <div className="flex gap-2">
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger
                    data-ocid="birthdays.month.select"
                    className="flex-1 bg-df-navy-mid border-white/[0.06] text-df-text text-sm h-8"
                  >
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="bg-df-navy-mid border-white/[0.06]">
                    {MONTHS.map((m, i) => (
                      <SelectItem
                        key={m}
                        value={String(i + 1)}
                        className="text-df-text"
                      >
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger
                    data-ocid="birthdays.day.select"
                    className="flex-1 bg-df-navy-mid border-white/[0.06] text-df-text text-sm h-8"
                  >
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent className="bg-df-navy-mid border-white/[0.06]">
                    {Array.from(
                      { length: daysInSelectedMonth },
                      (_, i) => i + 1,
                    ).map((d) => (
                      <SelectItem
                        key={d}
                        value={String(d)}
                        className="text-df-text"
                      >
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleAdd}
                  size="sm"
                  disabled={saving || !name.trim() || !month || !day}
                  className="flex-1 bg-pink-500 text-white font-medium hover:bg-pink-400 h-8 text-xs"
                  data-ocid="birthdays.submit_button"
                >
                  {saving ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    "Add Birthday"
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={() => setAdding(false)}
                  variant="outline"
                  size="sm"
                  className="border-white/10 bg-transparent text-df-text-muted hover:text-df-text h-8 text-xs"
                  data-ocid="birthdays.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading */}
      {isLoading && (
        <div
          className="flex items-center justify-center py-8"
          data-ocid="birthdays.loading_state"
        >
          <Loader2 className="w-5 h-5 text-df-text-muted animate-spin" />
        </div>
      )}

      {/* Contact list */}
      {!isLoading && (
        <div className="space-y-1">
          <AnimatePresence initial={false}>
            {sorted.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-df-text-muted text-sm"
                data-ocid="birthdays.empty_state"
              >
                No birthdays saved yet. Add someone!
              </motion.div>
            )}

            {/* Upcoming section */}
            {upcoming.length > 0 && (
              <div className="mb-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-pink-400/70 mb-1.5 px-1">
                  Coming up
                </p>
                {upcoming.map((contact, i) => {
                  const days = daysUntilBirthday(
                    Number(contact.birthMonth),
                    Number(contact.birthDay),
                  );
                  return (
                    <BirthdayRow
                      key={contact.name}
                      contact={contact}
                      days={days}
                      index={i + 1}
                      onDelete={handleDelete}
                      highlight
                    />
                  );
                })}
              </div>
            )}

            {/* Rest */}
            {rest.length > 0 && (
              <div>
                {upcoming.length > 0 && (
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-df-text-muted/50 mb-1.5 px-1">
                    Upcoming
                  </p>
                )}
                {rest.map((contact, i) => {
                  const days = daysUntilBirthday(
                    Number(contact.birthMonth),
                    Number(contact.birthDay),
                  );
                  return (
                    <BirthdayRow
                      key={contact.name}
                      contact={contact}
                      days={days}
                      index={upcoming.length + i + 1}
                      onDelete={handleDelete}
                      highlight={false}
                    />
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

interface BirthdayRowProps {
  contact: { name: string; birthMonth: bigint; birthDay: bigint };
  days: number;
  index: number;
  onDelete: (name: string) => void;
  highlight: boolean;
}

function BirthdayRow({
  contact,
  days,
  index,
  onDelete,
  highlight,
}: BirthdayRowProps) {
  const isToday = days === 0;
  const formatted = formatBirthday(
    Number(contact.birthMonth),
    Number(contact.birthDay),
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-3 group rounded-xl px-2 py-2.5 transition-colors ${
        highlight
          ? "bg-pink-500/5 hover:bg-pink-500/10"
          : "hover:bg-white/[0.03]"
      }`}
      data-ocid={`birthdays.item.${index}`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base ${
          isToday
            ? "bg-pink-500/20 border border-pink-400/40"
            : highlight
              ? "bg-pink-500/10 border border-pink-400/20"
              : "bg-white/[0.04] border border-white/[0.06]"
        }`}
      >
        {isToday ? "🎂" : "🎁"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-df-text truncate">
          {contact.name}
        </p>
        <p className="text-xs text-df-text-muted">{formatted}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {isToday ? (
          <span className="text-[10px] bg-pink-500/20 text-pink-300 rounded-full px-2 py-0.5 font-semibold">
            Today! 🎉
          </span>
        ) : (
          <span
            className={`text-[10px] rounded-full px-2 py-0.5 font-medium ${
              highlight
                ? "bg-pink-500/15 text-pink-300"
                : "bg-white/[0.06] text-df-text-muted"
            }`}
          >
            {days}d
          </span>
        )}
        <button
          type="button"
          onClick={() => onDelete(contact.name)}
          data-ocid={`birthdays.delete_button.${index}`}
          className="opacity-0 group-hover:opacity-100 text-df-text-muted hover:text-df-red transition-all p-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
