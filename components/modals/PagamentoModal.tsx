"use client";

import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CreditCard, DollarSign, Calendar, Wallet } from "lucide-react";
import { showSuccess } from "@/components/utils/toast"; 
import OrderDetails from "@/types/OrderDetails";
import { paymentData } from "@/types/PaymentData";



interface PaymentModalProps {
  order: OrderDetails;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (paymentData: paymentData) => void;
}

const PaymentModal = ({ order, open, onOpenChange, onConfirm }: PaymentModalProps) => {
  const [method, setMethod] = useState("PIX");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [value, setValue] = useState(order?.price);

  const handleConfirm = () => {
    onConfirm({ method, date, value });
    showSuccess("Pagamento registrado e OS finalizada!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-[#0F172A] border-white/10 text-white rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-2xl">
        <DialogHeader className="mb-6">
          <div className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-emerald-500/20">
            <Wallet size={28} />
          </div>
          <DialogTitle className="text-2xl font-black tracking-tight">Confirmar Recebimento</DialogTitle>
          <DialogDescription className="text-[#9CA3AF] font-medium">
            Registre os detalhes do pagamento para a ordem <span className="text-white">{order?.id}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest ml-1 flex items-center gap-2">
              <DollarSign size={14} className="text-emerald-400" /> Valor Recebido
            </Label>
            <Input 
              value={value} 
              onChange={(e) => setValue(Number(e.target.value))}
              className="bg-white/5 border-white/10 rounded-xl text-white h-12 focus-visible:ring-emerald-500" 
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest ml-1 flex items-center gap-2">
              <Calendar size={14} className="text-[#22D3EE]" /> Data do Pagamento
            </Label>
            <Input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white/5 border-white/10 rounded-xl text-white h-12 focus-visible:ring-emerald-500 [color-scheme:dark]" 
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest ml-1 flex items-center gap-2">
              <CreditCard size={14} className="text-[#8B5CF6]" /> Método de Pagamento
            </Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-12 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0F172A] border-white/10 text-white">
                <SelectItem value="PIX">PIX (Instantâneo)</SelectItem>
                <SelectItem value="DINHEIRO">Dinheiro (Espécie)</SelectItem>
                <SelectItem value="CARTAO">Cartão de Crédito/Débito</SelectItem>
                <SelectItem value="TRANSFERENCIA">Transferência Bancária</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="pt-8 gap-3">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl text-[#9CA3AF] hover:text-white font-bold h-12"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-black h-12 shadow-lg shadow-emerald-500/20 border-none transition-all hover:scale-[1.02]"
          >
            Confirmar Pagamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;