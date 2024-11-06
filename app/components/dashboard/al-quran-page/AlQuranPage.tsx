import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Murajaah from "./Murajaah";
import Ziyadah from "./Ziyadah";
import Tilawah from "./Tilawah";

const AlQuranPage = () => {
  return (
    <div>
      <Tabs defaultValue="murajaah">
        <TabsList>
          <TabsTrigger value="murajaah">Murajaah</TabsTrigger>
          <TabsTrigger value="ziyadah">Ziyadah</TabsTrigger>
          <TabsTrigger value="tilawah">Tilawah</TabsTrigger>
        </TabsList>
        <TabsContent value="murajaah">
          <Murajaah />
        </TabsContent>
        <TabsContent value="ziyadah">
          <Ziyadah />
        </TabsContent>
        <TabsContent value="tilawah">
          <Tilawah />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlQuranPage;
