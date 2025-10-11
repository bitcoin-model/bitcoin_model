import { Bitcoin, Github, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Bitcoin className="w-6 h-6 text-bitcoin-500" />
              <span>Bitcoin24</span>
            </div>
            <p className="text-sm text-muted-foreground">
              幫助您推動比特幣採用，21 年宏觀預測與微觀模型。
            </p>
          </div>

          {/* 連結 */}
          <div className="space-y-3">
            <h3 className="font-semibold">資源</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  使用文件
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  API 文件
                </a>
              </li>
            </ul>
          </div>

          {/* 原始貢獻者 */}
          <div className="space-y-3">
            <h3 className="font-semibold">原始貢獻者</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://x.com/saylor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-bitcoin-500 transition-colors"
                >
                  Michael J. Saylor
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/shirishjajodia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-bitcoin-500 transition-colors"
                >
                  Shirish Jajodia
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/_ChaitanyaJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-bitcoin-500 transition-colors"
                >
                  Chaitanya Jain (CJ)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部 */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Bitcoin24. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* 免責聲明 */}
        <div className="mt-4 text-xs text-muted-foreground text-center">
          此處提供的資訊僅供一般參考，不應被視為財務建議。在採取任何行動之前，請諮詢專業財務顧問。
        </div>
      </div>
    </footer>
  );
}

