import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

type ListingItem = {
  id: number;
  title: string;
  category: string;
  image: string;
  user: string;
  userAvatar: string;
  description: string;
  location: string;
};

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
};

const categories = [
  { name: 'Электроника', icon: 'Smartphone', color: 'bg-purple-500' },
  { name: 'Одежда', icon: 'Shirt', color: 'bg-pink-500' },
  { name: 'Дом и сад', icon: 'Home', color: 'bg-orange-500' },
  { name: 'Спорт', icon: 'Bike', color: 'bg-blue-500' },
  { name: 'Книги', icon: 'BookOpen', color: 'bg-green-500' },
  { name: 'Игрушки', icon: 'Gamepad2', color: 'bg-red-500' },
];

const mockListings: ListingItem[] = [
  {
    id: 1,
    title: 'iPhone 13 Pro',
    category: 'Электроника',
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
    user: 'Алексей М.',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    description: 'Отличное состояние, обменяю на флагман Android',
    location: 'Москва'
  },
  {
    id: 2,
    title: 'Винтажная кожаная куртка',
    category: 'Одежда',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    user: 'Сара К.',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    description: 'Аутентичная куртка 80-х, обменяю на дизайнерскую сумку',
    location: 'Санкт-Петербург'
  },
  {
    id: 3,
    title: 'Горный велосипед',
    category: 'Спорт',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400',
    user: 'Михаил Т.',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    description: 'Профессиональный горный велосипед, обменяю на шоссейный',
    location: 'Казань'
  },
  {
    id: 4,
    title: 'Игровая консоль',
    category: 'Электроника',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
    user: 'Эмма Р.',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    description: 'PS5 с контроллерами, обменяю на Nintendo Switch',
    location: 'Новосибирск'
  },
];

const Index = () => {
  const [selectedListing, setSelectedListing] = useState<ListingItem | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Алексей М.', text: 'Привет! Это еще актуально?', time: '10:30', isMe: false },
    { id: 2, sender: 'Вы', text: 'Да! Что хотите предложить?', time: '10:32', isMe: true },
    { id: 3, sender: 'Алексей М.', text: 'У меня есть Samsung Galaxy S23 в идеальном состоянии', time: '10:35', isMe: false },
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: 'Вы',
        text: newMessage,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="bg-white/80 backdrop-blur-lg border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Icon name="Repeat2" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Grand Exchange
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Как это работает</a>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setChatOpen(true)}
              >
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Сообщения
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Разместить
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Разместить объявление</DialogTitle>
                    <DialogDescription>Расскажите, что хотите обменять</DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Название</Label>
                      <Input id="title" placeholder="Что обмениваете?" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория</Label>
                      <select 
                        id="category"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      >
                        {categories.map(cat => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Опишите вашу вещь и что хотите получить взамен"
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Местоположение</Label>
                      <Input id="location" placeholder="Город" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="images">Фотографии</Label>
                      <Input id="images" type="file" multiple accept="image/*" />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Опубликовать
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Обменивайте всё и везде
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к самой яркой площадке для обмена. Меняйте ненужные вещи на то, что вам нравится.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8">
                <Icon name="Search" size={20} className="mr-2" />
                Смотреть объявления
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-2">
                <Icon name="Play" size={20} className="mr-2" />
                Видео-инструкция
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Популярные категории</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card 
                key={category.name}
                className="hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 animate-scale-in border-2 hover:border-primary"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon name={category.icon} className="text-white" size={32} />
                  </div>
                  <h4 className="font-semibold">{category.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Последние объявления</h3>
            <Button variant="ghost">
              Смотреть все
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockListings.map((item, index) => (
              <Card 
                key={item.id}
                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedListing(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900 hover:bg-white">
                    {item.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={item.userAvatar} />
                      <AvatarFallback>{item.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.user}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="MapPin" size={12} />
                        {item.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedListing && (
        <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedListing.title}</DialogTitle>
              <Badge className="w-fit">{selectedListing.category}</Badge>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <img 
                  src={selectedListing.image} 
                  alt={selectedListing.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Описание</h4>
                  <p className="text-sm text-muted-foreground">{selectedListing.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Владелец</h4>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedListing.userAvatar} />
                      <AvatarFallback>{selectedListing.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedListing.user}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Icon name="MapPin" size={14} />
                        {selectedListing.location}
                      </p>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => {
                    setChatOpen(true);
                    setSelectedListing(null);
                  }}
                >
                  <Icon name="MessageCircle" size={18} className="mr-2" />
                  Начать чат
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>Чат с Алексей М.</DialogTitle>
            <DialogDescription>Обсуждение: iPhone 13 Pro</DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${msg.isMe ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl px-4 py-2 ${
                      msg.isMe 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-2">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input 
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <Icon name="Repeat2" className="text-white" size={20} />
                </div>
                <span className="font-bold text-lg">Grand Exchange</span>
              </div>
              <p className="text-sm text-gray-400">
                Самая надежная площадка для обмена
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Все объявления</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Категории</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Как это работает</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Центр помощи</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Безопасность</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Документы</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Условия использования</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Правила сообщества</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Grand Exchange. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;