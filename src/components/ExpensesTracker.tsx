import React, { useState } from 'react';
import { usePanda } from '../context/PandaContext';
import { Transaction } from '../types';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  Legend
} from 'recharts';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Trash2,
  Calendar,
  Filter,
  DollarSign
} from 'lucide-react';

export default function ExpensesTracker() {
  const {
    transactions,
    addTransaction,
    deleteTransaction
  } = usePanda();

  // Inputs state
  const [type, setType] = useState<'ingreso' | 'gasto'>('gasto');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<Transaction['category']>('Comida');
  const [description, setDescription] = useState<string>('');
  
  // Filtering and active search
  const [search, setSearch] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');

  // Calculation summaries
  const totalIncomes = transactions
    .filter((t) => t.type === 'ingreso')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'gasto')
    .reduce((sum, t) => sum + t.amount, 0);

  const balanceAvailable = totalIncomes - totalExpenses;

  // Pie chart calculation (Expenses by category)
  const categoryDataDict = transactions
    .filter((t) => t.type === 'gasto')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const COLORS = {
    Comida: '#ffab00',
    Transporte: '#38bdf8',
    Educación: '#a855f7',
    Entretenimiento: '#f43f5e',
    Salud: '#10b981',
    Otros: '#64748b'
  };

  const pieChartData = Object.keys(categoryDataDict).map((catName) => ({
    name: catName,
    value: categoryDataDict[catName],
    color: COLORS[catName as keyof typeof COLORS] || '#94a3b8'
  }));

  // Bar chart total comparison
  const barChartData = [
    {
      name: 'Resumen',
      Ingresos: totalIncomes,
      Gastos: totalExpenses
    }
  ];

  // Handler to register transaction
  const handleAddNewTx = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmt = parseFloat(amount);
    if (!numAmt || numAmt <= 0) {
      alert('Ingresa una cantidad numérica mayor a 0 válidamente.');
      return;
    }
    addTransaction(type, numAmt, category, description);
    
    // Reset fields
    setAmount('');
    setDescription('');
  };

  // Filter list
  const filteredTxs = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) || 
                          t.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = categoryFilter === 'todos' || t.category === categoryFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen text-brand-dark select-none bg-brand-cream">
      
      {/* HEADER SECTION banner */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-black tracking-wider text-brand-pink uppercase">
            CONTROL DE GASTOS Y FLUJO
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
            Mis Finanzas Reales
          </h1>
        </div>
        
        <div className="bg-brand-pink/15 border border-brand-pink/25 px-4 py-2 rounded-xl flex items-center gap-2">
          <Wallet className="w-5 h-5 text-brand-pink" />
          <span className="text-xs font-mono text-brand-dark/85 font-black">Monedero STEALER integrado</span>
        </div>
      </div>

      {/* --- FINANCIAL HIGHLIGHT CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-brand-yellow to-brand-orange text-brand-dark rounded-2xl p-5 border border-brand-orange/30 shadow-md shadow-brand-yellow/15">
          <span className="text-[10px] text-brand-dark/65 font-black uppercase tracking-widest font-mono block">
            Saldo Total Disponible
          </span>
          <h2 className="text-3xl font-black text-brand-dark mt-1.5 font-mono">
            ${balanceAvailable.toLocaleString()} COP
          </h2>
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full font-black bg-white/45 text-brand-dark border border-white/40">
              {balanceAvailable >= 0 ? 'Balance Positivo' : 'Alerta de Déficit'}
            </span>
          </div>
        </div>

        {/* Income Card */}
        <div className="bg-white rounded-2xl p-5 border border-brand-gray/80 shadow-sm flex justify-between items-center">
          <div>
            <span className="text-[10px] text-brand-dark/50 font-black uppercase tracking-widest font-mono block">
              Ingresos Totales
            </span>
            <h2 className="text-2xl font-black text-brand-green mt-1 font-mono">
              +${totalIncomes.toLocaleString()} COP
            </h2>
          </div>
          <div className="bg-brand-green/10 p-2.5 rounded-xl border border-brand-green/20 text-brand-green">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white rounded-2xl p-5 border border-brand-gray/80 shadow-sm flex justify-between items-center">
          <div>
            <span className="text-[10px] text-brand-dark/50 font-black uppercase tracking-widest font-mono block">
              Gastos Totales
            </span>
            <h2 className="text-2xl font-black text-brand-coral mt-1 font-mono">
              -${totalExpenses.toLocaleString()} COP
            </h2>
          </div>
          <div className="bg-brand-coral/10 p-2.5 rounded-xl border border-brand-coral/20 text-brand-coral">
            <ArrowDownRight className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* --- GRAPHICS PANEL BLOCK --- */}
      {transactions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Expenses Category Pie */}
          <div className="bg-white rounded-3xl p-5 border border-brand-gray/80 shadow-sm">
            <h3 className="text-sm font-black text-brand-dark/75 mb-4 uppercase tracking-wider">
              Distribución de Gastos
            </h3>
            
            {pieChartData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-xs text-brand-dark/45">
                Aún no has registrado gastos para graficar.
              </div>
            ) : (
              <div className="h-56 flex flex-col md:flex-row items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      contentStyle={{ background: '#ffffff', border: '1px solid #e4e3d4', borderRadius: '12px' }}
                      itemStyle={{ color: '#37332b', fontSize: '12px', fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Custom Color Indicators Legend */}
                <div className="flex flex-col gap-1.5 flex-shrink-0 text-xs w-full md:w-36 mt-4 md:mt-0 font-bold">
                  {pieChartData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-brand-cream/20 p-1 rounded-md">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-brand-dark/85 truncate">{item.name}</span>
                      <span className="font-mono text-brand-dark/65 font-black ml-auto">${item.value.toLocaleString()} COP</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Income vs Expense Bar Chart */}
          <div className="bg-white rounded-3xl p-5 border border-brand-gray/80 shadow-sm">
            <h3 className="text-sm font-black text-brand-dark/75 mb-4 uppercase tracking-wider">
              Flujo: Ingresos vs Egresos
            </h3>
            
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#a7b408" style={{ fontSize: '11px', fontWeight: 'bold' }} />
                  <YAxis stroke="#a7b408" style={{ fontSize: '11px', fontWeight: 'bold' }} />
                  <ChartTooltip
                    contentStyle={{ background: '#ffffff', border: '1px solid #e4e3d4', borderRadius: '12px', color: '#37332b' }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                  <Bar dataKey="Ingresos" fill="#a7b408" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Gastos" fill="#ff9191" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* --- FORM + TRANSACTION LIST MODULES --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
        
        {/* Registration Form (Left) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-brand-gray/80 shadow-sm h-fit">
          <h2 className="text-base font-black text-brand-dark mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-brand-pink" />
            Registrar Movimiento
          </h2>

          <form onSubmit={handleAddNewTx} className="flex flex-col gap-4">
            
            {/* Toggle Switch Type */}
            <div className="bg-brand-cream/60 p-1 rounded-xl flex border border-brand-gray/80">
              <button
                type="button"
                onClick={() => setType('gasto')}
                className={`flex-1 py-2 text-xs font-black rounded-lg cursor-pointer transition-all ${
                  type === 'gasto'
                    ? 'bg-brand-coral text-white shadow-sm'
                    : 'text-brand-dark/50 hover:text-brand-pink'
                }`}
              >
                Gasto (Egreso)
              </button>
              <button
                type="button"
                onClick={() => setType('ingreso')}
                className={`flex-1 py-2 text-xs font-black rounded-lg cursor-pointer transition-all ${
                  type === 'ingreso'
                    ? 'bg-brand-green text-white shadow-sm'
                    : 'text-brand-dark/50 hover:text-brand-pink'
                }`}
              >
                Ingreso
              </button>
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-dark/70">Cantidad (Monto en $ COP)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-dark/40">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  id="tx-amount"
                  type="number"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Ej. 15000"
                  className="w-full bg-brand-cream/40 border border-brand-gray/80 focus:border-brand-pink pl-9 pr-4 py-3 rounded-xl outline-none text-sm text-brand-dark font-mono font-bold"
                  required
                />
              </div>
            </div>

            {/* Category Select (Only if Type is Expense) */}
            {type === 'gasto' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-brand-dark/70">Categoría del Gasto</label>
                <select
                  id="tx-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Transaction['category'])}
                  className="w-full bg-brand-cream/40 border border-brand-gray/80 focus:border-brand-pink px-4 py-3 rounded-xl outline-none text-sm text-brand-dark font-bold animate-fade-in"
                >
                  <option value="Comida">🍕 Comida / Super</option>
                  <option value="Transporte">🚗 Transporte </option>
                  <option value="Educación">📚 Educación</option>
                  <option value="Entretenimiento">🎮 Entretenimiento</option>
                  <option value="Salud">🏥 Salud</option>
                  <option value="Otros">📦 Otros Gastos</option>
                </select>
              </div>
            )}

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-dark/70">Descripción o Concepto</label>
              <input
                id="tx-desc"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej. Almuerzo, suscripción, sueldo..."
                className="w-full bg-brand-cream/40 border border-brand-gray/80 focus:border-brand-pink px-4 py-3 rounded-xl outline-none text-sm text-brand-dark font-bold"
                required
              />
            </div>

            <button
              id="btn-register-tx"
              type="submit"
              className="w-full py-4 bg-brand-yellow hover:bg-brand-yellow/95 text-brand-dark font-black rounded-xl transition-all shadow-md shadow-brand-yellow/15 border-b-2 border-brand-orange cursor-pointer text-sm"
            >
              Añadir Transacción
            </button>
          </form>
        </div>

        {/* Transaction History (Right) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-brand-gray/80 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h2 className="text-base font-black text-brand-dark flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-pink" />
              Historial de Movimientos
            </h2>

            {/* Filters selectors */}
            <div className="flex gap-2">
              <div className="relative flex-1 md:w-44">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-brand-cream/60 border border-brand-gray/80 focus:border-brand-pink rounded-xl px-3 py-1.5 text-xs outline-none text-brand-dark font-bold"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-brand-cream/60 border border-brand-gray/80 rounded-xl px-2.5 py-1.5 text-xs text-brand-dark font-black outline-none"
              >
                <option value="todos">Todas cat.</option>
                <option value="Comida">🍕 Comida</option>
                <option value="Transporte">🚗 Transporte</option>
                <option value="Educación">📚 Educación</option>
                <option value="Entretenimiento">🎮 Entretenimiento</option>
                <option value="Salud">🏥 Salud</option>
                <option value="Otros">📦 Otros</option>
              </select>
            </div>
          </div>

          <hr className="border-brand-gray/60" />

          {/* List display */}
          <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-1">
            {filteredTxs.length === 0 ? (
              <div className="text-center py-10 text-xs text-brand-dark/50 italic font-semibold">
                Ningún movimiento financiero coincide. ¡Añade tu primer gasto!
              </div>
            ) : (
              filteredTxs.map((t) => {
                const isExpense = t.type === 'gasto';
                const catColor = COLORS[t.category as keyof typeof COLORS] || '#94a3b8';
                return (
                  <div
                    key={t.id}
                    className="bg-brand-cream/40 border border-brand-gray/60 p-3 rounded-xl flex items-center justify-between text-xs hover:border-brand-orange/40 hover:bg-white transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      {/* Indication Category Dot */}
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: isExpense ? catColor : '#a7b408' }}
                      />
                      
                      <div>
                        <div className="font-bold text-brand-dark">{t.description}</div>
                        <div className="text-[10px] text-brand-dark/50 font-medium flex items-center gap-1.5 mt-0.5">
                          <span>{t.date}</span>
                          <span>•</span>
                          <span className="opacity-90">{isExpense ? t.category : 'Ingreso directo'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`font-mono font-black text-sm ${isExpense ? 'text-brand-coral' : 'text-brand-green'}`}>
                        {isExpense ? '-' : '+'}${t.amount.toLocaleString()} COP
                      </span>
                      
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="p-1.5 text-brand-dark/40 hover:text-brand-coral rounded-lg transition-colors cursor-pointer"
                        title="Borrar transacción"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
