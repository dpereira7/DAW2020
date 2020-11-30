<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Arqueossítios do NW português</title>
                    <link rel="stylesheet" href="https:/www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <div class="w3-container w3-amber">
                        <h2 style="text-align: center;font-size: 30px;font-weight: bold">Arqueossítios do NW português</h2>
                    </div>
                    <h3 style="text-align: center;font-size: 20px;">Índice de Arqueossítios</h3>
                    <ul style="columns: 2;">
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates select="//ARQELEM" mode="conteudo"/>
    </xsl:template>
    
    
    
    <!-- Templates para o Índice -->    
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{position()}"/>
            <a href="http://localhost:7777/arqs{position()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    
    
    <!-- Templates para o Conteúdo -->    
    
    <xsl:template match="ARQELEM" mode="conteudo">
        <xsl:result-document href="site/arq{position()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                    <link rel="stylesheet" href="https:/www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <div class="w3-container w3-amber">
                        <p><h4 style="text-align: center;font-size: 28px; font-weight: bold"><xsl:value-of select="IDENTI"/></h4></p>
                    </div>    
                    
                    <xsl:if test="IMAGEM">
                        <p><b>Imagem:</b><xsl:value-of select="IMAGEM/@NOME"/></p>
                    </xsl:if>
                    
                    <p><b>Descrição:</b><xsl:apply-templates select="DESCRI" mode="notas"/></p>
                    
                    <xsl:if test="CRONO">
                        <p><b>Cronologia:</b><xsl:value-of select="CRONO"/></p>
                    </xsl:if>
                    
                    <p><b>Lugar:</b><xsl:apply-templates select="LUGAR"/></p>
                    <p><b>Fregue:</b><xsl:apply-templates select="FREGUE"/></p>
                    <p><b>Concelho:</b><xsl:apply-templates select="CONCEL"/></p>
                    
                    <xsl:if test="CODADM">
                        <p><b>Código Administrativo:</b><xsl:value-of select="CODADM"/></p>
                    </xsl:if>
                    
                    <xsl:if test="LATITU">
                        <p><b>Latitude:</b><xsl:value-of select="LATITU"/></p>
                    </xsl:if>
                    
                    <xsl:if test="LONGITU">
                        <p><b>Longitude:</b><xsl:value-of select="LONGITU"/></p>
                    </xsl:if>
                    
                    <xsl:if test="ALTITU">
                        <p><b>Altitude:</b><xsl:value-of select="ALTITU"/></p>
                    </xsl:if>
                    
                    <xsl:if test="ACESSO">
                        <p><b>Acessos:</b><xsl:apply-templates select="ACESSO" mode="notas"/></p>
                    </xsl:if>
                    
                    <xsl:if test="QUADRO">
                        <p><b>Quadro:</b><xsl:apply-templates select="QUADRO" mode="notas"/></p>
                    </xsl:if>
                    
                    <xsl:if test="TRAARQ">
                        <p><b>Trabalhos Arqueológicos:</b><xsl:apply-templates select="TRAARQ" mode="notas"/></p>
                    </xsl:if>
                    
                    <xsl:if test="DESARQ">
                        <p><b>Descrição Arqueológica:</b><xsl:apply-templates select="DESARQ" mode="notas"/></p>
                    </xsl:if>
                    
                    <xsl:if test="INTERP">
                        <p><b>Interpretação:</b><xsl:apply-templates select="INTERP" mode="notas"/></p>
                    </xsl:if>
                    
                    <xsl:if test="DEPOSI">
                        <p><b>Depósito:</b><xsl:value-of select="DEPOSI"/></p>
                    </xsl:if>
                    
                    <xsl:if test="INTERE">
                        <p><b>Interesse:</b><xsl:apply-templates select="INTERE" mode="notas"/></p>
                    </xsl:if>
                    
                    <p><b>Bibliografia:</b><xsl:apply-templates select="BIBLIO" mode="notas"/></p>
                    
                    <span style="text-align: center;">
                        <p><b>Autor:</b><xsl:value-of select="AUTOR"/></p>
                    </span>
                    
                    <span style="text-align: right;">
                        <p><b>Data:</b><xsl:value-of select="DATA"/></p>
                    </span>
                    
                    <address style="text-align: center;">
                        [ <a href="index.html#i{generate-id()}">Voltar à Home</a>]
                    </address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="LIGA" mode="notas">
        <u><xsl:value-of select="."/></u>
    </xsl:template>
    
</xsl:stylesheet>