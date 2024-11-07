export type MockDataItem = {
  id: number;
  name: string;
  image: string;
  type: "Image" | "Video";
  createdDate: Date;
};

export function generateMockData(count: number = 100): MockDataItem[] {
  const mockData: MockDataItem[] = [];

  for (let i = 1; i <= count; i++) {
    const isImage = Math.random() > 0.5;

    mockData.push({
      id: i,
      name: `Item ${i}`,
      image: isImage
        ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADVUlEQVR4nO1Y60tTYRzeh/4At7m55o2xOZe3Xf4BvzSTnIoIBQXh1NJMSUOktOyizRuhZhFmWYhKYFRmF8JrKtqSpTWVbZXVmf9A6df4xe8dns3azTXbGZ0HHhjvefee5/ndznY4HBYsWLBgwcINImzr2VwrNcm1Ups8qx1CQa6V2uRaqYkI27qOsxNwLZQhVKJ5nsxY7I1+Rz7UYnke6FcmsGxCLZTnuaTG/TGwwWADP3waCLVIng8yyoDwzTIoatpApSslVFS3QtTMYngYQPHK3DLQaPXbiGsC4wrzDWDkNVo9KCqbiGDkvtMGspZYc435BrBkNFr9tmhjVnBNlV0a5gZywsAANqxGqydlg8KRWyWE5cV4AzhtlB6aWDi7xHwDSIFxhTQs1jwSI+9NPOMM8AIga4C//AVkhh5Q5lcQSpt7yFpYZIC/+o2eFK5MqmgE/upXhhuwUCA/1+6YFHnlEDVlAtGUiXzGNXltB9nDWAMyQ4/jIaMrBdGYkV4XTSyAKvckuSa7csvrzSMXP4K07R6kHamGtMNVkHDpJghn3+++AUlnPxGoziyG6CdTf1wXP5sG9cHjZI/ker/b7MX2jYAy35EtV6oziyCxrhOEc+bdMRB/95HjRgeKIPbBS48HRw+Nkj24N757yJmhMSMkn6h39kvZZRA/nwXR+FuQ13fR38EAyAy3QWCyBM8ALSqjEOJ7H/uMTlzfU7IXGdc3DLKr3bRAnFiYhd/7RDhvJqVEG8kqAWlrL0Qu2f7OgM+y8EBJ54Aj2hnOEpG23IHID5+8fk80sQCKMy10plQ5ZSDpGgC++fPODbg2ZkKD98Z02/BNjoZXZxRBjJey47nh3lfzoKhqdv42yjsFkhuD9LPGpwGcClvNJq9tD2w04si90EELiJp+t+MzxCOvt/UOTq24+8OQnn5xj0fx6v2FYtwYjIcTPvTw3xa5+aFKUuuBnBPzcBRSCs66TK6COS8G9CbclFxSD3zzWsDiaRPmNXIWnplSWBf4WRYKYgdfQOrR6p9qrX7SswFtwUzqsZrvgkX3EyAQ4lkpxechqbzx37zYirCt64IlPtjkWu1ZHH+AL1IZJ95ib/BLvGsmMGWhfNXItVIbDg1+Rp4FCxYsWPx3+AXBJFBpcu5N0QAAAABJRU5ErkJggg=="
        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABGElEQVR4nO2UPUuCURiGn392ksCMpqOI5GBB5SAktAl+dMDBtV8Q7S2BZBRURFOTgYXvVpNQgWODZHdQr2M49H49dl9wTwcO5+K5nyNCCCGE+Bh7Cg2R31goAZkjF+e5UMByAgi9QibBEQpYTgCJrtDuyQvSG5d6d8B5QKM/wXpnAJNVKuD8VLuvWNm80ivgPKA5+EDpwMNStqdTwPnZOx9jtXyjV8B5QOth+jONXE+nwCw7R886BWp37yi07//0O0kcAvX+5Ls6qfyZrh1oPU6xffiE5eJFIHebqAT2h5+oHI+Q2boO7OEmKoFq9w1rldvAH26iEgg7QgHLCSD0Csmc/YjzXChgOQGEXiGT4MjCChBCCPl3fAHsvLu7bMuofAAAAABJRU5ErkJggg==",
      type: isImage ? "Image" : "Video",
      createdDate: getRandomDate(new Date(2020, 0, 1), new Date()),
    });
  }

  return mockData;
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
